import React, { useRef, useState, useEffect } from 'react';
import './GameOnline.css';
import circle_icon from '../../../img/circle.png';
import cross_icon from '../../../img/cross.png';
import io from 'socket.io-client';
import GameChat from '../chat/GameChat';
import PlaySound from '../../../sounds/play.mp3'
import LoseSound from '../../../sounds/lose.mp3'
import WinSound from '../../../sounds/won.mp3'
import { useNavigate } from 'react-router-dom';

const GameOnline = ({ room, user, tag }) => {
  const [turn, setTurn] = useState(tag === 'x');
  const [lock, setLock] = useState(false);
  const [win, setWin] = useState(false);
  const titleRef = useRef(null);
  const titleRef2 = useRef(null);
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  const socket = useRef(null);
  const [player, setPlayer] = useState(JSON.parse(localStorage.getItem('user')).username);
  const [opponent, setOpponent] = useState('');
  const playSound = new Audio(PlaySound)
  const winSound = new Audio(WinSound)
  const loseSound = new Audio(LoseSound)
  const navigate = useNavigate();

  useEffect(() => {
    // Connect to Socket.IO server
    if (!socket.current) {
      socket.current = user;
    }

  socket.current.on('handShake', (arg) => {
    setOpponent(arg)
  });
    socket.current.emit('handShake', {opp: player, room: room});
    // socket.current.emit('joinRoom', room);
    console.log(room, opponent)

    socket.current.on("userLeft", (arg) => {
      titleRef.current.innerHTML = "Opponent left the game ✈️";
      titleRef2.current.innerHTML = "Wanna play again?";
      setLock(true);
      setWin(true)
    });

    socket.current.on("num", (arg) => {
      if(arg.tag === 'o') {
        document.querySelector('.x' + arg.index).innerHTML = `<img src='${circle_icon}'>`;
        data[arg.index] = "o";
      } else {
        document.querySelector('.x' + arg.index).innerHTML = `<img src='${cross_icon}'>`;
        data[arg.index] = "x";
      }
      setTurn(tag !== arg.tag);
      console.log(arg)
      checkWin()
      checkDraw()
      // Cleanup function for disconnecting socket
      return () => {
        socket.current.disconnect();
      };
    });
  }, []);

  const toggle = (num) => {
    if (lock || data[num] !== '' || !turn) {
      return 0;
    }
    if (tag === 'x') {
      document.querySelector('.x' + num).innerHTML = `<img src='${cross_icon}'>`;
      data[num] = "x";
      setTurn(false);
    } else {
      document.querySelector('.x' + num).innerHTML = `<img src='${circle_icon}'>`;
      data[num] = "o";
      setTurn(false);
    }
    
    playSound.play();
    socket.current.emit('num', {player: player, index: num, tag: tag, room: room });
    checkWin();
    console.log("win:", win)
    checkDraw()
  };

  const checkWin = () => {
    if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data[2]);
    } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
      won(data[5]);
    } else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
      won(data[6]);
    } else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
      won(data[7]);
    } else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
      won(data[6]);
    }
  };

  const gameLog = async(won) => {
        try {
            const response = await fetch('/api/user/gameLog', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username: player, won: won, opponent: opponent})
            });
            if (response.ok) {
              const data = await response.json();
              return data
            } else {
                throw new Error('Failed to fetch update score');
            }
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
  }

    const updateScore = async (score, won) => {
      console.log('score', user)
        try {
            const response = await fetch('/api/user/updateScore', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username: player, score: score, won: won})
            });
            if (response.ok) {
              const data = await response.json();
              return data
            } else {
                throw new Error('Failed to fetch update score');
            }
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
  };

  const won = (winner) => {
    setLock(true);
    // if (winner === "x") {
    //   titleRef.current.innerHTML = `Congratulations: <img src='${cross_icon}'> Wins`;
    // } else {
    //   titleRef.current.innerHTML = `Congratulations: <img src='${circle_icon}'> Wins`;
    // }
    setWin(true)
    const score = Math.floor(Math.random() * 6) + 25;
    if (winner === tag) {
      updateScore(score, true);
      gameLog(true)
      titleRef.current.innerHTML = `Victory is yours! 🏆`;
      titleRef2.current.innerHTML = `Good Job! You got ${score} points.`;
      winSound.play()
    } else {
      updateScore(-score, false);
      // gameLog(false)
      titleRef.current.innerHTML = `Oops, you lost! 😞`;
      titleRef2.current.innerHTML = `You lost -${score} points. Keep trying!`;
      loseSound.play()
    }
    
  };

  const checkDraw = () => {
    let draw = true;
    for (let i = 0; i < 9; i++) {
      if (data[i] === '') {
        draw = false;
        break;
      }
    }
    if (draw && !win) {
      titleRef.current.innerHTML = `It's a Draw! 😕`;
      titleRef2.current.innerHTML = `No winners`;
      setLock(true);
      setWin(true);
    }
  };

  const reset = () => {
    setLock(false);
    setData(["", "", "", "", "", "", "", "", ""]);
    setTurn(true);
    titleRef.current.innerHTML = "Tic Tac Toe";
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => box.innerHTML = "");
  };

  return (
    <div className='boardContainerOnline'>
      <h1 className='title' ref={titleRef}>Tic Tac Toe</h1>
      <h1 className='title2' ref={titleRef2}>
        {
        (turn && !win)  ? `Your Turn` : `Opponent\'s Turn`
      }
      {
        (win)  && ``
      }
      </h1>
      
      <div className='board'>
        <div className='row1'>
          <div className='box x0' onClick={() => { toggle(0) }}></div>
          <div className='box x1' onClick={() => { toggle(1) }}></div>
          <div className='box x2' onClick={() => { toggle(2) }}></div>
        </div>
        <div className='row2'>
          <div className='box x3' onClick={() => { toggle(3) }}></div>
          <div className='box x4' onClick={() => { toggle(4) }}></div>
          <div className='box x5' onClick={() => { toggle(5) }}></div>
        </div>
        <div className='row3'>
          <div className='box x6' onClick={() => { toggle(6) }}></div>
          <div className='box x7' onClick={() => { toggle(7) }}></div>
          <div className='box x8' onClick={() => { toggle(8) }}></div>
        </div>
      </div>
      <h2 className='opponent'>
        {player.toUpperCase()}:{'  '}
        {tag === 'x' ? <img src={cross_icon} alt="Cross Icon" /> : <img src={circle_icon} alt="Circle Icon" />}{'  '}
        <strong>vs</strong>{' '}
        {opponent.toUpperCase()}:{'  '}
        {tag === 'x' ? <img src={circle_icon} alt="Circle Icon" /> : <img src={cross_icon} alt="Cross Icon" />}
      </h2>
      { win &&  <button className='reset' onClick={() => { navigate('/') }}>Exit Game</button>}
      <GameChat room={room} user={user} />
    </div>
  );
};

export default GameOnline;
