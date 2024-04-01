import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './LeaderBoard.css';

const LeaderBoard = () => {
    const [leaderboardData, setLeaderboardData] = useState([]); // State to hold leaderboard data

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const response = await axios.post('/api/user/leaderboard'); 
                setLeaderboardData(response.data);
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            }
        };

        fetchLeaderboardData();
    }, []); 

    return (
        <div className='leaderBoardContainer'>
            <main className="main">
                <div className="header">
                    <h1 className="leaderBoardTitle">Ranking</h1>
                </div>
                <div className="leaderboard">
                    <div className="ribbon"></div>
                    <table className="table">
                        <tbody>
                            {leaderboardData.map((entry, index) => (
                                <tr key={index} className="row">
                                    <td className="cell number">{index + 1}</td>
                                    <td className="cell name">{entry.username.toUpperCase()}</td>
                                    <td className="cell points">{entry.score}{index === 0 && <img className="gold-medal" src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true" alt="Gold Medal"/>}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
        
    );
}

export default LeaderBoard;
