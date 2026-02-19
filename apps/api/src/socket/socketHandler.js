import {chatService} from "../services/chatService.js";

export const setupSocketHandlers = (io) => {
    io.on('connection', (socket) => {
        socket.on('join_room', ({pseudo, age, room}) => {
            socket.join(room);
            socket.pseudo = pseudo;
            socket.to(room).emit('message', {
                user: 'System',
                text: `${pseudo} a rejoint le salon`
            });
            console.log(`${pseudo} est dans ${room}`);
        });
        socket.on('disconnect', ()=> {
            if (socket.pseudo) {
                chatService.removeUser(socket.pseudo);
                console.log(`${socket.pseudo} est parti`);
            }
        })
    })


}