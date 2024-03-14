import React, { useRef, useState, useEffect } from 'react';
import './GameOnline.css';
import circle_icon from '../../../img/circle.png';
import cross_icon from '../../../img/cross.png';
import io from 'socket.io-client';
import GameChat from '../chat/GameChat';
import playSound from '../../../sounds/play.mp3'

const GameOnline = ({ room, user }) => {
  const [turn, setTurn] = useState(true);
  const [tag, setTag] = useState('x');
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  const socket = useRef(null);
  const [player, setPlayer] = useState(JSON.parse(localStorage.getItem('user')).username);
  const [opponent, setOpponent] = useState('');

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
      titleRef.current.innerHTML = "You win, Opponent left the game";
      setLock(true);
    });

    socket.current.on("num", (arg) => {
      if(arg.tag === 'o') {
        document.querySelector('.x' + arg.index).innerHTML = `<img src='${circle_icon}'>`;
        data[arg.index] = "o";
        setTag('x');
        setTurn(true);
      } else {
        document.querySelector('.x' + arg.index).innerHTML = `<img src='${cross_icon}'>`;
        data[arg.index] = "x";
        setTag('o');
        setTurn(true);
      }
      console.log(arg)
      checkWin()

      // Cleanup function for disconnecting socket
      return () => {
        socket.current.disconnect();
      };
    });
  }, [room]);

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
    new Audio(playSound).play();
    socket.current.emit('num', { index: num, tag: data[num], room: room });
    checkWin();
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

  const won = (winner) => {
    setLock(true);
    if (winner === "x") {
      titleRef.current.innerHTML = `Congratulations: <img src='${cross_icon}'> Wins`;
    } else {
      titleRef.current.innerHTML = `Congratulations: <img src='${circle_icon}'> Wins`;
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
    <div className='boardContainer'>
      <h1 className='title' ref={titleRef}>Tic Tac Toe</h1>
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
      <h2 className='opponent'>{player} vs {opponent}</h2>
      {/* <button className='reset' onClick={() => { reset() }}>Reset</button> */}
      <GameChat room={room} user={user} />
    </div>
  );
};

export default GameOnline;
