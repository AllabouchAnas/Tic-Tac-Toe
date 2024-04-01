import React, { useState, useEffect, useRef } from 'react';
import GameOnline from './GameOnline'; // Import the GameOnline component
import io from 'socket.io-client';

function GameQueue() {
    const [playersJoined, setPlayersJoined] = useState(0);
    const [roomName, setRoomName] = useState('');
    const [tag, setTag] = useState('');
    const socket = useRef(null);

    useEffect(() => {
        socket.current = io();

        socket.current.emit('joinQueue');

        socket.current.on('startGame', (room) => {
            setRoomName(room);
            setPlayersJoined(2); 
        });

        socket.current.on('tag', (tag) => {
            setTag(tag)
        });

        return () => {
            socket.current.disconnect();
        };
    }, []);

    if (playersJoined >= 2 && roomName) {
        return <GameOnline room={roomName} user={socket.current} tag={tag} />;
    } else {
        return (
            <div className='game-queue'>
                <p>Waiting for another player to join ...</p>
            </div>
        );
    }
}

export default GameQueue;
