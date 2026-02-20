import {io} from 'socket.io-client';

let socket;

export const initiateSocket = () => {
    socket = io({ autoConnect: false });
    return socket;
};

export const disconnectSocket = () => {
    if (socket) socket.disconnect();
};

export const joinRoom = (pseudo, age, roomChoice) => {
    if (socket) {
        socket.connect();
        socket.emit("join_room", {pseudo, age, roomChoice});
    }
};

export const sendMessage = (text) => {
    if (socket) socket.emit('send_message', {text});
};

export const onHistory = (callback) => {
    if (socket) socket.on('history', callback);
};

export const onMessage = (callback) => {
    if (socket) socket.on('message', callback);
};

export const offMessage = () => {
    if (socket) socket.off('message');
};

export const onRoomUsers = (callback) => {
    if (socket) socket.on('room_users', callback);
};

export const offRoomUsers = () => {
    if (socket) socket.off('room_users');
};

export const leaveRoom = (room)=> {
    if (socket) socket.emit('leave_room', room);
}

export const getSocket = () => socket;