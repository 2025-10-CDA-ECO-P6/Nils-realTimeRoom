import store from "../../store.js";

export const chatService = {
    addUser: (pseudo, room) => {
        store.users.set(pseudo, room);
    },

    removeUser: (pseudo) => {
        store.users.delete(pseudo);
    },

    getUsersByRoom: (room) => {
        return Array.from(store.users.entries())
            .filter(([_, r]) => r === room)
            .map(([pseudo]) => pseudo);
    },

    addMessage: (room, message) => {
        if (store.rooms[room]) {
            store.rooms[room].messages.push(message);
        }
    },

    getMessages: (room) => {
        return store.rooms[room]?.messages ?? [];
    },

    getRooms: () => {
        return Object.entries(store.rooms).map(([name, data]) => ({
            name,
            description: data.description
        }));
    },

    isPseudoDispo: (pseudo) => !store.users.has(pseudo)
};