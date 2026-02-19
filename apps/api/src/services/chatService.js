const users = new Set();

export const chatService = {
    isPseudoDispo : (pseudo) => !users.has(pseudo),

    addUser: (pseudo) => {
        if (pseudo) users.add(pseudo);
    },

    removeUser: (pseudo) => {
        users.delete(pseudo)
    },

    getAllUsers : ()=> Array.from(users)
}