import React from 'react'
import {useEffect, useState} from "react";
import {CodeIcon, GamepadIcon, PartyPopper, SendIcon, User, Users2} from 'lucide-react';
import {useParams} from 'react-router-dom';
import {joinRoom,  playMove,} from "../services/socketClient";
import {useGame} from "../hooks/useGame";
import MorpionBoard from "./game/MorpionBoard";
import GameInvitation from "./game/GameInvitation";
import {useChat} from "../hooks/useChat";
import GamePicker from "./game/GamePicker";
import {useChallenge} from "../hooks/useChallenge";
import {useRoomNav} from "../hooks/useRoomNav";
import MessagesList from "./Messages/MessagesList";
import MessageInput from "./Messages/MessageInput";
import RoomHeader from "./Messages/RoomHeader";


function ChatPage() {
    const {room} = useParams();
    const pseudo = sessionStorage.getItem('pseudo');


    const {currentGame} = useGame(room);
    const { messages, connectedUsers, roomInfo } = useChat(room);
    const { incomingChallenge, pickerTarget, setPickerTarget, handleAccept, handleDecline, handleSelectGame } = useChallenge();
    const {handleChangeRoom} = useRoomNav(room, pseudo);


    useEffect(() => {
        joinRoom(pseudo, null, room)
    }, [room]);



    const handleCellClick = (index) => {
        if (currentGame?.matchId) playMove(currentGame.matchId, index);

    }

    return (
        <div className="chat-page-container">
            <GameInvitation
                challenge={incomingChallenge}
                onAccept={handleAccept}
                onDecline={handleDecline}
            />
            <GamePicker
                target={pickerTarget}
                onSelect={handleSelectGame}
                onClose={() => setPickerTarget(null)}
            />

            <div className="messages-container">
                <RoomHeader roomInfo={roomInfo} onChangeRoom={handleChangeRoom}/>
                <MessagesList messages={messages} pseudo={pseudo}/>
                <MessageInput/>
            </div>

            <div className="room-informations">

                <div className="count">
                    <div className='count-left²'>
                        <Users2/>
                    </div>
                    <div className='count-right'>
                        <span>Salon : {room.toUpperCase()}</span>
                        <span>{connectedUsers.length} en ligne</span>
                    </div>
                </div>
               <div className="right-panel-container">
                   <div className="connected-user-list">
                       {connectedUsers.map((user, index) => (
                           <div className="user-container" key={index}>
                               <User size={24}/>
                               <span>{user.pseudo}</span>
                               {user.pseudo !== pseudo && (
                                   <button onClick={() => setPickerTarget(user)}>
                                       <GamepadIcon size={16}/>
                                   </button>
                               )}
                           </div>
                       ))}
                   </div>
                   <div className="activity-container">
                       {currentGame && (
                               <MorpionBoard
                                   board={currentGame.board}
                                   onMove={handleCellClick}
                                   winner={currentGame.winner}
                                   state={currentGame.state}
                                   currentPlayer={currentGame.currentPlayer}
                                   cols={currentGame.cols}
                               />

                       )}
                   </div>
               </div>
            </div>
        </div>
    );
}

export default ChatPage;