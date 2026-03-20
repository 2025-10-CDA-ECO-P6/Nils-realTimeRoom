import React from 'react'
import {useEffect, useState, useRef} from "react";
import {CodeIcon, GamepadIcon, PartyPopper, SendIcon, User, Users2} from 'lucide-react';
import {useNavigate, useParams} from 'react-router-dom';
import {getSocket, joinRoom, leaveRoom, offChallengeEvents, onReceiveChallenge, playMove, respondToChallenge, sendChallenge, sendMessage} from "../services/socketClient";
import {useGame} from "../hooks/useGame";
import MorpionBoard from "./MorpionBoard";
import GameInvitation from "./GameInvitation";
import {useChat} from "../hooks/useChat";
import GamePicker from "./GamePicker";
import {useChallenge} from "../hooks/useChallenge";
import {useRoomNav} from "../hooks/useRoomNav";


function ChatPage() {
    const {room} = useParams();
    const [input, setInput] = useState('');

    const messagesEndRef = useRef(null);
    const pseudo = sessionStorage.getItem('pseudo');
    const availablesRooms = [
        {name: 'Fun', icon: <PartyPopper/>},
        {name: 'Gaming', icon: <GamepadIcon/>},
        {name: 'Dev', icon: <CodeIcon/>}
    ];

    const {currentGame} = useGame(room);
    const { messages, connectedUsers, roomInfo } = useChat(room);
    const { incomingChallenge, pickerTarget, setPickerTarget, handleAccept, handleDecline, handleSelectGame } = useChallenge();
    const {handleChangeRoom} = useRoomNav(room, pseudo);


    useEffect(() => {
        joinRoom(pseudo, null, room)
    }, [room]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);


    const handleCellClick = (index) => {
        if (currentGame?.matchId) playMove(currentGame.matchId, index);

    }


    const handleSend = () => {
        if (!input.trim()) return;
        sendMessage(input.trim());
        setInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend();
    };



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
                <div className="header">
                    <div className="greet-message">
                        {roomInfo.description}
                    </div>
                    <div className="roomList-container">
                        {availablesRooms.map((r) => (
                            <div key={r.name} className="room-item" onClick={()=> handleChangeRoom(r.name)}>
                                {r.icon}
                                <span>{r.name.toUpperCase()}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="messages-content-container">
                    {messages.map((msg, index) => (
                        <div key={index} className={`bubble ${msg.user === pseudo ? 'me' : msg.user === 'System' ? 'system' : 'other'}`}>
                            {msg.user !== pseudo && msg.user !== 'System' && (
                                <span className="bubble-author">{msg.user.trim().charAt(0).toUpperCase()} : </span>
                            )}
                            <span className="bubble-text">{msg.text}</span>
                        </div>
                    ))}
                    <div ref={messagesEndRef}/>
                </div>

                <div className="messages-input-container">
                    <input
                        className="message-input"
                        placeholder="Saisissez votre message ..."
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={handleSend}>
                        <SendIcon size={18}/>
                    </button>
                </div>
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