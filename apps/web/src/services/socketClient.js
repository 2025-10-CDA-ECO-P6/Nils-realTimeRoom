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
        if (socket.connected) {
            socket.emit("join_room", {pseudo, age, roomChoice});
        } else {
            socket.connect();
            socket.once('connect', () => {
                socket.emit("join_room", {pseudo, age, roomChoice});
            });
        }
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
};

export const onRoomInfo = (callback) => {
    if (socket) socket.on('room_info', callback);
};


// ======= GAME HANDLERS =======
export const startMatch = (opponentId) => {
    if (socket) socket.emit('game:start', {opponentSocketId : opponentId});
}

export const playMove = (matchId, index) => {
    if (socket) socket.emit('game:playMove', {matchId: matchId, index: index});
}

export const onGameReady = (callback) => {
    if (socket) socket.on('game:ready', callback);
}

export const onGameUpdate = (callback) => {
    if (socket) socket.on('game:updated', callback);
}

export const offGameEvents = () => {
    if (socket) {
        socket.off('game:ready');
        socket.off('game:updated');
    }
};

// ========== CHALLENGE HANDLERS
export const sendChallenge = (targetSocketId, game) => {
    if (socket) socket.emit('game:challenge_user', {targetSocketId, game});
};

export const respondToChallenge = (senderSocketId, accept, game ) => {
    if (socket) socket.emit('game:respond_challenge', {senderSocketId, accept, game});
};

export const onReceiveChallenge = (callback) => {
    console.log("socket au moment de onReceiveChallenge:", socket?.id, socket?.connected);
    if (socket) socket.on('game:incoming_challenge', (data) => {
        console.log("incoming_challenge reçu:", data);
        callback(data);
    });
};

export const offChallengeEvents = () => {
    if (socket) {
        socket.off('game:incoming_challenge');
    }
}

export const getSocketId = () => socket?.id;

export const getSocket = () => socket;