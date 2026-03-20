import {Check, Sword, X} from "lucide-react";

function GameInvitation({challenge, onAccept, onDecline}) {
    console.log("GameInvitation render, challenge:", challenge);
    if (!challenge) return null;

    return (
        <div className="challenge-toast">
            <div className="challenge-icon">
                <Sword size={20}/>
            </div>
            <div className="challenge-text">
                <strong>{challenge.fromPseudo}</strong> Vous défie au Morpion !
            </div>
            <div className="challenge-actions">
                <button className="accept" onClick={onAccept}><Check size={18}/></button>
                <button className="decline" onClick={onDecline}><X size={18}/></button>
            </div>
        </div>
    )
}

export default GameInvitation;
