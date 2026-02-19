import {io} from 'socket.io-client';

let socket;

export const initiateSocket = () => {
    socket = io({
        autoConnect : false
    })
    console.log("c bon c crée");
    return socket;
};

export const disconnectSocket = () => {
    if (socket) socket.disconnect();
};

export const joinRoom = (pseudo, age,  room) => {
    if (socket) {
        socket.connect();
        socket.emit("join_room", {pseudo, age, room});
    }
};

export const getSocket = () => socket;