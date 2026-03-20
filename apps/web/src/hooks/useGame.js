
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useEffect} from "react";
import {offGameEvents, onGameReady, onGameUpdate} from "../services/socketClient";
import {useGameStore} from "../store/gameStore";

export const useGame = (room) => {
    const { games, setGame, updateGame, clearGame } = useGameStore();

    useEffect(() => {
        onGameReady((gameData) => {
            setGame(room, gameData);
        });

        onGameUpdate((updatedData) => {
            updateGame(room, updatedData);

            const updated = { ...games[room], ...updatedData };
            if (updated.state === 1 || updated.state === 2) {
                setTimeout(() => clearGame(room), 3000);
            }
        });

        return () => offGameEvents();
    }, [room]);
    return { currentGame: games[room] ?? null };
}
