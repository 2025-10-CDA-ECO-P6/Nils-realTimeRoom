import {chatService} from "../services/chatService.js";

import store from "../../store.js";

export const setupSocketHandlers = (io, gameManager) => {
    io.on('connection', (socket) => {
        socket.on('join_room', ({pseudo, age, roomChoice}) => {
            socket.join(roomChoice);
            socket.pseudo = pseudo;
            socket.roomChoice = roomChoice;
            chatService.addUser(socket.id, pseudo, roomChoice);
            const roomKey = Object.keys(store.rooms).find(
                k => k.toLowerCase() === roomChoice.toLowerCase()
            );

            socket.emit('room_info', {
                name: roomChoice,
                description: store.rooms[roomKey]?.description
            });
            socket.emit('history', chatService.getMessages(roomKey));
            socket.to(roomChoice).emit('message', {
                user: 'System',
                text: `${pseudo} a rejoint le salon`
            });

            const usersInRoom = chatService.getUsersByRoom(roomChoice);
            console.log("Users émis :", JSON.stringify(usersInRoom));
            io.to(roomChoice).emit('room_users', usersInRoom);
            console.log(`${pseudo} est dans ${roomChoice}`);

        });

        socket.on('send_message', ({text}) => {
            const message  = {
                user: socket.pseudo,
                text
            };
            chatService.addMessage(socket.roomChoice, message);
            io.to(socket.roomChoice).emit('message', message);
        });

        socket.on('leave_room', (room) => {
            socket.leave(room);
            chatService.removeUser(socket.id);
            io.to(room).emit('room_users', chatService.getUsersByRoom(room));
        })

        socket.on('get_room', () => {})

        socket.on('disconnect', ()=> {
            if (socket.pseudo) {
                chatService.removeUser(socket.id);
                io.to(socket.roomChoice).emit('room_users', chatService.getUsersByRoom(socket.roomChoice));
                console.log(`${socket.pseudo} est parti de ${socket.roomChoice}`);
            }
        });

        // demaragge dune partie

        socket.on('game:challenge_user', ({targetSocketId, game}) => {
            console.log("challenge :", game ,"->  reçu de", socket.pseudo, "vers", targetSocketId);
            const targetSocket = io.sockets.sockets.get(targetSocketId);
            console.log("socket cible trouvée ?", !!targetSocket);
            const challenger = socket.pseudo;

            io.to(targetSocketId).emit('game:incoming_challenge', {
                fromPseudo : challenger,
                fromSocketId : socket.id,
                game
            });
        });

        socket.on('game:respond_challenge', ({senderSocketId, accept, game}) => {
            if (!accept) {
                io.to(senderSocketId).emit('game:challenge_declined');
                return;
            }
            const matchId = `match_${senderSocketId}_${socket.id}`;
            const gameToLaunch = gameManager.launchGame(matchId, 'morpion', senderSocketId,socket.id, game ); // a dynamiser aprew

            const challengerSocket = io.sockets.sockets.get(senderSocketId);
            if (challengerSocket) {
                challengerSocket.join(matchId);
                socket.join(matchId);

                io.to(matchId).emit('game:ready', {
                    matchId: matchId,
                    ...gameToLaunch.toJson()
                });
            }
        });


        // gestrion des coups
        socket.on('game:playMove', ({matchId, index}) => {
            if (!socket.rooms.has(matchId)) return;
            const game = gameManager.getGame(matchId);
            if (!game) return;
            if (game.currentPlayer.socketId !== socket.id) return;
            game.playMove(index); // on joue le coup demandé

            // on diffuse la maj a tout les jours de la sous-room de la partie
            io.to(matchId).emit('game:updated', {
               ...game.toJson()
            });

            // on netoi le tout
            if (game.isFinished()) {
                setTimeout(() => {
                    gameManager.removeGame(matchId);
                    io.in(matchId).socketsLeave(matchId)
                }, 5000)
            }
        })
    })
}