import React, { useRef, useState, useEffect } from 'react'
import './GameOnline.css'
import circle_icon from '../../../img/circle.png'
import cross_icon from '../../../img/cross.png'
import io from 'socket.io-client';


const GameOnline = () => {
  const [turn, setTurn] = useState(true);
  const [tag, setTag] = useState('x');
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""])
  const socket = useRef(null)

  useEffect(() => {
    // Connect to Socket.IO server
    socket.current = io();

    socket.current.on("num", (arg) => {
      console.log(arg);
      
      console.log(arg.turn);
        if(arg.tag === 'o') {
          document.querySelector('.x' + arg.index).innerHTML = `<img src='${circle_icon}'>`
          data[arg.index] = "o";
          setTag('x')
          setTurn(true)
          localStorage.setItem('board', JSON.stringify(data));
        }else {
          document.querySelector('.x' + arg.index).innerHTML = `<img src='${cross_icon}'>`
          data[arg.index] = "x";
          setTag('o')
          setTurn(true)
          localStorage.setItem('board', JSON.stringify(data));
        }
      
      console.log(data)
    });

    return () => {
        // Disconnect from Socket.IO server when component unmounts
        socket.current.disconnect();
    };
}, []);  

  const toggle = (num) => {
    if (lock || data[num]!=='' || !turn) {
      return 0
    }
    if (tag === 'x') {
      document.querySelector('.x' + num).innerHTML = `<img src='${cross_icon}'>`
      data[num] = "x";
      setTurn(false)
      localStorage.setItem('board', JSON.stringify(data));
    }else {
      document.querySelector('.x' + num).innerHTML = `<img src='${circle_icon}'>`
      data[num] = "o";
      setTurn(false)
      localStorage.setItem('board', JSON.stringify(data));
    }
    socket.current.emit('num', {index: num, tag: data[num]});
    checkWin()
  }

  const checkWin = () => {
    if (data[0]===data[1] && data[1]===data[2] && data[2]!=="") {
      won(data[2]);
    }
    else if (data[3]===data[4] && data[4]===data[5] && data[5]!=="") {
      won(data[5]);
    }
    else if (data[6]===data[7] && data[7]===data[8] && data[8]!=="") {
      won(data[8]);
    }
    else if (data[0]===data[3] && data[3]===data[6] && data[6]!=="") {
      won(data[6]);
    }
    else if (data[1]===data[4] && data[4]===data[7] && data[7]!=="") {
      won(data[7]);
    }
    else if (data[2]===data[5] && data[5]===data[8] && data[8]!=="") {
      won(data[8]);
    }
    else if (data[0]===data[4] && data[4]===data[8] && data[8]!=="") {
      won(data[8]);
    }
    else if (data[2]===data[4] && data[4]===data[6] && data[6]!=="") {
      won(data[6]);
    }
  }

  const won = (winner) => {
    setLock(true)
    if (winner==="x") {
      titleRef.current.innerHTML = `Congratulations: <img src='${cross_icon}'> Wins`
    } else {
      titleRef.current.innerHTML = `Congratulations: <img src='${circle_icon}'> Wins`
    }
  }

  const reset = () => {
    setLock(false)
    setData(["", "", "", "", "", "", "", "", ""])
    setTurn(true)
    titleRef.current.innerHTML = "Tic Tac Toe"
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => box.innerHTML = "");
    localStorage.removeItem('board')
  }

  return (
    <div className='boardContainer'>
      <h1 className='title' ref={titleRef}>Tic Tac Toe</h1>
      <div className='board'>
        <div className='row1'>
          <div className='box x0' onClick={() => {toggle(0)}}></div>
          <div className='box x1' onClick={() => {toggle(1)}}></div>
          <div className='box x2' onClick={() => {toggle(2)}}></div>
        </div>
        <div className='row2'>
          <div className='box x3' onClick={() => {toggle(3)}}></div>
          <div className='box x4' onClick={() => {toggle(4)}}></div>
          <div className='box x5' onClick={() => {toggle(5)}}></div>
        </div>
        <div className='row3'>
          <div className='box x6' onClick={() => {toggle(6)}}></div>
          <div className='box x7' onClick={() => {toggle(7)}}></div>
          <div className='box x8' onClick={() => {toggle(8)}}></div>
        </div>
      </div>
      <button className='reset' onClick={() => {reset()}}>Reset</button>
    </div>
  )
}

export default GameOnline