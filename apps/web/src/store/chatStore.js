import {create} from 'zustand'

export const useChatStore = create((set)=>({
    messages : {},
    connectedUsers : {},
    roomInfo : {},

    setMessages : (room, messages) => set((state)=> ({
        messages: {...state.messages, [room]: messages}
    })),

    addMessage: (room, msg) => set((state) => ({
        messages: {
            ...state.messages,
            [room]: [...(state.messages[room] ?? []), msg]
        }
    })),

    setConnectedUsers: (room, users) => set((state) => ({
        connectedUsers: { ...state.connectedUsers, [room]: users }
    })),

    setRoomInfo: (room, info) => set((state) => ({
        roomInfo: { ...state.roomInfo, [room]: info }
    })),

}))