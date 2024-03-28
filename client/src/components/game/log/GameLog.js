import React, { useEffect, useState } from 'react';
import { AiOutlineTrophy, AiOutlineCloseCircle } from 'react-icons/ai';
import './GameLog.css';

const GameLog = () => {
    const [gameLog, setGameLog] = useState([]);

    useEffect(() => {
        const fetchGameLog = async () => {
            try {
                const response = await fetch('/api/user/getGameLog', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ username: JSON.parse(localStorage.getItem('user')).username})
                });
                if (response.ok) {
                    const data = await response.json();
                    setGameLog(data.gameLog);
                } else {
                    throw new Error('Failed to fetch game log');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchGameLog();
    }, []);

    return (
        <div className="game-log-log">
            <h2 className="log">Game Log</h2>
            {gameLog.map((game, index) => (
                <div key={index} className="card-log">
                    <div className="card-header-log">{new Date(game.createdAt).toLocaleString()}</div>
                    <div className="card-body-log">
                        <div className="user-info-log">
                            <img src="https://randomuser.me/api/portraits/lego/6.jpg" alt="Profile Picture" />
                            <div>
                                <p><strong>{game.username.toUpperCase()}</strong> </p>
                                <p><strong></strong>Score: {game.score}</p>
                            </div>
                        </div>
                        <div className="outcome-log">
                            {game.won ? <AiOutlineTrophy size={20} color="#00FF00" /> : <AiOutlineCloseCircle size={20} color="#FF0000" />}
                        </div>
                        <div className="opponent-info-log">
                            <div>
                                <p><strong>{game.opponent.toUpperCase()}</strong></p>
                                <p><strong></strong>Score: 400{game.opponentScore}</p>
                            </div>
                            <img src="https://randomuser.me/api/portraits/lego/6.jpg" alt="Opponent Profile Picture" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default GameLog;
