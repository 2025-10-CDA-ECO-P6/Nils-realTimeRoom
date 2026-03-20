import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useEffect} from "react";
import {offMessage, offRoomUsers, onHistory, onMessage, onRoomInfo, onRoomUsers} from "../services/socketClient";

export const useChat = (room) => {
    const queryClient = useQueryClient();

    const {data: messages = []} = useQuery({
        queryKey : ['messages', room],
        queryFn: () => [],
        staleTime : Infinity,
        initialData: []
    });

    const {data: connectedUsers = []} = useQuery({
        queryKey : ['connectedUsers', room],
        queryFn: ()=> [],
        staleTime: Infinity,
        initialData: []
    });

    const {data: roomInfo = []} = useQuery({
        queryKey: ['roomInfo', room],
        queryFn: () => [],
        staleTime: Infinity,
        initialData: {}
    });

    useEffect(()=>{
        onRoomInfo((info) => {
            queryClient.setQueryData(['roomInfo', room], info)
        });
        onHistory((history) => {
            queryClient.setQueryData(['messages', room], history);
        });
        onMessage((msg) => {
            queryClient.setQueryData(['messages', room], (old) => {
                if (!Array.isArray(old)) return [msg];
                return [...old, msg];
            });
        });
        onRoomUsers((users) => {
            queryClient.setQueryData(['connectedUsers', room], users);
        });

        return () => {
            offMessage();
            offRoomUsers();
        }
    }, [room, queryClient])
    return { messages, connectedUsers, roomInfo };

}