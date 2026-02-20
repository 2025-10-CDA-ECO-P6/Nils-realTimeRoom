import React from 'react'
import {useEffect, useState, useRef} from "react";
import {CodeIcon, GamepadIcon, PartyPopper, SendIcon, User} from 'lucide-react';
import {useNavigate, useParams} from 'react-router-dom';
import {
    joinRoom,
    leaveRoom,
    offMessage,
    offRoomUsers,
    onHistory,
    onMessage,
    onRoomUsers,
    sendMessage
} from "../services/socketClient";
function ChatPage() {

    const {room} = useParams();
    const [messages, setMessages] = useState([]);
    const [connectedUsers, setConnectedUsers] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);
    const pseudo = sessionStorage.getItem('pseudo');
    const navigate = useNavigate();
    const availablesRooms = [
        {name: 'Fun', icon: <PartyPopper/>},
        {name: 'Gaming', icon: <GamepadIcon/>},
        {name: 'Dev', icon: <CodeIcon/>}
    ];



    useEffect(() => {
        onHistory((history) => {setMessages(history);});
        onMessage((msg) => {setMessages(prev => [...prev, msg]);});
        onRoomUsers((users) => {setConnectedUsers(users);});

        return () => {
            offMessage();
            offRoomUsers();
        };
    }, [room]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);

    const handleChangeRoom = (roomName) => {
        if (roomName.toLowerCase() === room)return;
        leaveRoom(room);
        joinRoom(pseudo, null, roomName.toLowerCase());
        navigate(`/chat/${roomName.toLowerCase()}`);
    }
    const handleSend = () => {
        if (!input.trim()) return;
        sendMessage(input.trim());
        setInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend();
    };
    console.log("pseudo session:", JSON.stringify(pseudo));
    return (
        <div className="chat-page-container">
            <div className="messages-container">
                <div className="header">
                    <div className="greet-message">
                        Bienvenue dans la room {room}
                    </div>
                    <div className="roomList-container">
                        {availablesRooms.map((r) => (
                            <div key={r.name} className="room-item" onClick={()=> handleChangeRoom(r.name)}>
                                {r.icon}
                                <span>{r.name}</span>
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
                    <span>Room : {room}</span>
                    <span>Connectés : {connectedUsers.length}</span>
                </div>
                <div className="connected-user-list">
                    {connectedUsers.map((user, index) => (
                        <div className="user-container" key={index}>
                            <User size={24}/>
                            <span>{user}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ChatPage;