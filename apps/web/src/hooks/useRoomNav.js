import {useNavigate} from "react-router-dom";
import {joinRoom, leaveRoom} from "../services/socketClient";

export const useRoomNav  = (room, pseudo) => {
    const navigate = useNavigate();

    const handleChangeRoom = (roomName) => {
        if (roomName.toLowerCase() === room) return;
        leaveRoom(room);
        joinRoom(pseudo, null, roomName.toLowerCase());
        navigate(`/chat/${roomName.toLowerCase()}`);
    };

    return {handleChangeRoom};
}