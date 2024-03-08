import React, { useState } from 'react';
import { Navigate  } from 'react-router-dom';


function GameQueue() {
  const [playersJoined, setPlayersJoined] = useState(0);

  // Function to handle when a player joins
  const handlePlayerJoin = () => {
    setPlayersJoined(playersJoined + 1);
  };

  return (
    <div className='game-queue'>
      {playersJoined < 2 ? (
        <div>
          <p>Waiting for another player to join ...</p>
        </div>
      ) : (
        <Navigate to="/gameonline" />
      )}
    </div>
  );
}

export default GameQueue;
