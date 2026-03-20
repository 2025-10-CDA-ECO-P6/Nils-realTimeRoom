import React, {useState} from 'react'
import {SendIcon} from "lucide-react";
import {sendMessage} from "../../services/socketClient";

function MessageInput() {
    const [input, setInput] = useState('')
    const handleSend = () => {
        if (!input.trim()) return;
        sendMessage(input.trim());
        setInput('');
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend();
    };
    return (
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
    )
}

export default MessageInput
