import React from 'react'
import {GamepadIcon, User} from "lucide-react";

function UserList({connectedUsers, pseudo, onChallenge }) {
    return (
        <div className="connected-user-list">
            {connectedUsers.map((user, index) => (
                <div className="user-container" key={index}>
                    <User size={24}/>
                    <span>{user.pseudo}</span>
                    {user.pseudo !== pseudo && (
                        <button onClick={() => onChallenge(user)}>
                            <GamepadIcon size={16}/>
                        </button>
                    )}
                </div>
            ))}
        </div>
    )
}

export default UserList
