import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useEffect} from "react";
import {offMessage, offRoomUsers, onHistory, onMessage, onRoomInfo, onRoomUsers} from "../services/socketClient";

export const useChat = (room) => {
    const { messages, connectedUsers, roomInfo, setMessages, addMessage, setConnectedUsers, setRoomInfo } = useChatStore();

    useEffect(() => {
        onRoomInfo((info) => setRoomInfo(room, info));
        onHistory((history) => setMessages(room, history));
        onMessage((msg) => addMessage(room, msg));
        onRoomUsers((users) => setConnectedUsers(room, users));

        return () => {
            offMessage();
            offRoomUsers();
        };
    }, [room]);

    return {
        messages: messages[room] ?? [],
        connectedUsers: connectedUsers[room] ?? [],
        roomInfo: roomInfo[room] ?? {}
    };
};