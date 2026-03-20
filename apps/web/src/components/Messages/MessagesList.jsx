import React, {useEffect, useRef} from 'react'

function MessagesList({messages, pseudo}) {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior : 'smooth'});
    }, [messages]);
    return (
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
    )
}

export default MessagesList
