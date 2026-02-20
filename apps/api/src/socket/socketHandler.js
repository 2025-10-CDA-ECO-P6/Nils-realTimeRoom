
import {chatService} from "../services/chatService.js";

export const setupSocketHandlers = (io) => {
    io.on('connection', (socket) => {
        socket.on('join_room', ({pseudo, age, roomChoice}) => {
            socket.join(roomChoice);
            socket.pseudo = pseudo;
            socket.roomChoice = roomChoice;
            chatService.addUser(pseudo, roomChoice);
            socket.emit('history', chatService.getMessages(roomChoice));
            socket.to(roomChoice).emit('message', {
                user: 'System',
                text: `${pseudo} a rejoint le salon`
            });

            io.to(roomChoice).emit('room_users', chatService.getUsersByRoom(roomChoice));
            console.log(`${pseudo} est dans ${roomChoice}`);
            console.log('all users in room :', chatService.getUsersByRoom(roomChoice));
        });

        socket.on('send_message', ({text}) => {
            const message  = {
                user: socket.pseudo,
                text
            };
            chatService.addMessage(socket.roomChoice, message);
            io.to(socket.roomChoice).emit('message', message);
        })

        socket.on('disconnect', ()=> {
            if (socket.pseudo) {
                chatService.removeUser(socket.pseudo);
                console.log(`${socket.pseudo} est parti`);
            }
        })
    })
}