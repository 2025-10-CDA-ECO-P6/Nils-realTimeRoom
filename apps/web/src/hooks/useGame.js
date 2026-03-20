
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useEffect} from "react";
import {offGameEvents, onGameReady, onGameUpdate} from "../services/socketClient";

export const useGame = (room) => {
    const queryClient = useQueryClient();

    const {data : currentGame} = useQuery({
        queryKey : ['currentGame', room],
        queryFn: () => null,
        initialData : null
    })

    useEffect(()=> {
        onGameReady((gameData) => {
            queryClient.setQueryData(['currentGame', room], gameData)
        });

        onGameUpdate((updatedData) => {
            queryClient.setQueryData(['currentGame', room], (old) => {
                const newGame = old ? {...old, ...updatedData} : updatedData;
                if (newGame.state === 1 || newGame.state === 2) {
                    setTimeout(() => {
                        queryClient.setQueryData(['currentGame', room], null);
                    }, 3000);
                }
                return newGame;
            });
        });

        return () => offGameEvents();
    }, [room, queryClient]);
    return {currentGame};
}
