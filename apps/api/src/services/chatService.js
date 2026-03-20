import store from "../../store.js";

export const chatService = {
    addUser: (socketId, pseudo, room) => {
        store.users.set(socketId, {pseudo, room});
    },

    removeUser: (socketId) => {
        store.users.delete(socketId);
    },

    getUsersByRoom: (room) => {
        const result = Array.from(store.users.entries())
            .filter(([_, data]) => data.room.toLowerCase() === room.toLowerCase())
            .map(([socketId, data]) => ({
                pseudo: data.pseudo,
                socketId: socketId
            }));
        console.log("getUsersByRoom appelé avec:", room, "→ résultat:", JSON.stringify(result));
        return result;
    },
    addMessage: (room, message) => {
        const roomKey = Object.keys(store.rooms).find(k => k.toLowerCase() === room.toLowerCase());
        if (roomKey) {
            store.rooms[roomKey].messages.push(message);
        }
    },

    getMessages: (room) => {
        const roomKey = Object.keys(store.rooms).find(k => k.toLowerCase() === room.toLowerCase());
        return store.rooms[roomKey]?.messages ?? [];
    },

    getRooms: () => {
        return Object.entries(store.rooms).map(([name, data]) => ({
            name,
            description: data.description
        }));
    },

    isPseudoDispo: (pseudo) => {
        return !Array.from(store.users.values()).some(u => u.pseudo === pseudo);
    }
};