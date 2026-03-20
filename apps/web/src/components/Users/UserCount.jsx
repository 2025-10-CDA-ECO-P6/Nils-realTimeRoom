import React from 'react'
import {Users2} from "lucide-react";

function UserCount({connectedUsers, room}) {
    return (
        <div className="count">
            <div className='count-left²'>
                <Users2/>
            </div>
            <div className='count-right'>
                <span>Salon : {room.toUpperCase()}</span>
                <span>{connectedUsers.length} en ligne</span>
            </div>
        </div>
    )
}

export default UserCount
