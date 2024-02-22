    // GameChat.js
import React, { useState } from 'react';
import './GameChat.css'

const GameChat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
        // Implement message sending logic (e.g., using sockets)
        if (input.trim() !== '') {
            // Here you can emit a socket event to send the message
            setMessages(prevMessages => [...prevMessages, input]);
            setInput('');
        }
    };

    return (
        <div className="chat">
            <div className="chatMessages">
                {messages.map((message, index) => (
                    <div key={index} className="message">{message}</div>
                ))}
            </div>
            <div className="chatInput">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default GameChat;
