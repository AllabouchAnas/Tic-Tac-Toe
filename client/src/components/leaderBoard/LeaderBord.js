import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import './LeaderBoard.css';

const LeaderBoard = () => {
    const [leaderboardData, setLeaderboardData] = useState([]); // State to hold leaderboard data

    useEffect(() => {
        // Fetch leaderboard data from your backend API
        const fetchLeaderboardData = async () => {
            try {
                const response = await axios.post('/api/user/leaderboard'); // Assuming '/api/leaderboard' is the correct route
                setLeaderboardData(response.data); // Set leaderboard data in state
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            }
        };

        fetchLeaderboardData(); // Call the function to fetch data when the component mounts
    }, []); // Empty dependency array to run the effect only once

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
