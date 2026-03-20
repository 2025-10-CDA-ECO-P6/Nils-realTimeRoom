import {create} from 'zustand';

export const useGameStore = create((set) => ({
    games: {},

    setGame: (room, game) => set((state) => ({
        games : {...state.games, [room] : game}
    })),


    updateGame: (room, updatedData) => set((state)=> ({
        games : {
            ...state.games,
            [room] : state.games[room]
                ? {...state.games[room], ...updatedData}
                : updatedData
        }
    })),

    clearGame : (room) => set((state) => ({
        games: {...state.games, [room] : null}
    })),
}));