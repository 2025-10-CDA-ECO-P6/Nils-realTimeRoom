import React from 'react'
import {CodeIcon, GamepadIcon, PartyPopper} from "lucide-react";

function RoomHeader({roomInfo, onChangeRoom}) {
    const availablesRooms = [
        {name: 'Fun', icon: <PartyPopper/>},
        {name: 'Gaming', icon: <GamepadIcon/>},
        {name: 'Dev', icon: <CodeIcon/>}
    ];
    return (
        <div className="header">
            <div className="greet-message">
                {roomInfo.description}
            </div>
            <div className="roomList-container">
                {availablesRooms.map((r) => (
                    <div key={r.name} className="room-item" onClick={() => onChangeRoom(r.name)}>
                        {r.icon}
                        <span>{r.name.toUpperCase()}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RoomHeader
