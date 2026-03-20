import {useEffect,  useState} from "react";
import {
    getSocket,
    offChallengeEvents,
    onReceiveChallenge,
    respondToChallenge,
    sendChallenge
} from "../services/socketClient";

export const useChallenge = () => {
    const [incomingChallenge, setIncomingChallenge] = useState(null);
    const [pickerTarget, setPickerTarget] = useState(null);

    useEffect(() => {
        const socket = getSocket()
        const register  = () => {
            onReceiveChallenge((data) => setIncomingChallenge(data));
        };

        if (socket.connected) {
            register();
        } else {
            socket.once('connect', register);
        }

        return () => offChallengeEvents();
    }, []);

    const handleAccept = () => {
        respondToChallenge(incomingChallenge.fromSocketId, true, incomingChallenge.game);
        setIncomingChallenge(null);
    };

    const handleDecline = () => {
        respondToChallenge(incomingChallenge.fromSocketId, false);
        setIncomingChallenge(null);
    };

    const handleSelectGame = (target, game) => {
        setPickerTarget(null);
        sendChallenge(target.socketId, game);
    };

    return {
        incomingChallenge,
        pickerTarget,
        setPickerTarget,
        handleAccept,
        handleDecline,
        handleSelectGame
    };
}