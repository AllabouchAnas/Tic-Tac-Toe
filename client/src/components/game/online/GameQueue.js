import React, { useState, useEffect, useRef } from 'react';
import GameOnline from './GameOnline'; // Import the GameOnline component
import io from 'socket.io-client';

function GameQueue() {
    const [playersJoined, setPlayersJoined] = useState(0);
    const [roomName, setRoomName] = useState('');
    const socket = useRef(null);

    useEffect(() => {
        // Connect to Socket.IO server
        socket.current = io();

        // Join the queue when the component mounts
        socket.current.emit('joinQueue');

        // Listen for start game event and receive the room name
        socket.current.on('startGame', (room) => {
            setRoomName(room);
            setPlayersJoined(2); // Set playersJoined to 2 to trigger the redirection
        });

        return () => {
            // Disconnect from Socket.IO server when component unmounts
            socket.current.disconnect();
        };
    }, []);

    // Render the GameOnline component if enough players have joined and a room name is available
    if (playersJoined >= 2 && roomName) {
        return <GameOnline room={roomName} />;
    } else {
        return (
            <div className='game-queue'>
                <p>Waiting for another player to join ...</p>
            </div>
        );
    }
}

export default GameQueue;
