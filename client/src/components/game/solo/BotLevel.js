import React, { useState } from 'react';
import './GameSolo.css'; 
import { FaRobot } from 'react-icons/fa';
import GameSolo from './GameSolo'; // Import the GameSolo component

const BotLevel = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null); // State to track selected difficulty

  // Function to handle card click
  const handleCardClick = (difficulty) => {
    console.log(`${difficulty.name} clicked`);
    setSelectedDifficulty(difficulty); // Set selected difficulty in state
  };

  // Render GameSolo if a difficulty is selected, otherwise render the card selection
  return (
    <div className="bot-level">
      {selectedDifficulty ? (
        <GameSolo difficulty={selectedDifficulty.level} />
      ) : (
        <div className="container">
          <div className="top-cards">
            <div className="card easy" onClick={() => handleCardClick({ level: 1, name: "Easy Bot" })}>
              <FaRobot size={50} />
              <h2>Easy Bot</h2>
              <p>Difficulty: Easy</p>
            </div>
            <div className="card medium" onClick={() => handleCardClick({ level: 3, name: "Medium Bot" })}>
              <FaRobot size={50} />
              <h2>Medium Bot</h2>
              <p>Difficulty: Medium</p>
            </div>
          </div>
          <div className="bottom-cards">
            <div className="card hard" onClick={() => handleCardClick({ level: 4, name: "Hard Bot" })}>
              <FaRobot size={50} />
              <h2>Hard Bot</h2>
              <p>Difficulty: Hard</p>
            </div>
            <div className="card extreme" onClick={() => handleCardClick({ level: 10, name: "Extreme Bot" })}>
              <FaRobot size={50} />
              <h2>Extreme Bot</h2>
              <p>Difficulty: Extreme</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BotLevel;
