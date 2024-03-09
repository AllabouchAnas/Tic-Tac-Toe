import React, { useState, useEffect } from 'react';
import './GameChat.css';
import io from 'socket.io-client';

const GameChat = ({ room, user }) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        // Connect to Socket.IO server
        const socket = io();
        setSocket(socket);

        socket.emit('joinRoom', room);

        socket.on('message', (message) => {
            console.log(message)
            setMessages(prevMessages => [...prevMessages, message.message]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (input.trim() !== '' && socket) {
            // Emit a socket event to send the message to the server
            socket.emit('message', { message: input, room: room });
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
