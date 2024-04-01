import React, { useRef, useState, useEffect } from 'react';
import './GameSolo.css';
import circle_icon from '../../../img/circle.png';
import cross_icon from '../../../img/cross.png';
import { useNavigate } from 'react-router-dom';
import PlaySound from '../../../sounds/play.mp3'
import LoseSound from '../../../sounds/lose.mp3'
import WinSound from '../../../sounds/won.mp3'

const apiUrl = 'http://127.0.0.1:5000';

const GameSolo = ({ difficulty }) => {
    let data = ["", "", "", "", "", "", "", "", ""];
    const [turn, setTurn] = useState(true);
    const [win, setWin] = useState(false);
    const [draw, setDraw] = useState(false);
    const [end, setEnd] = useState(false);
    const [gameStarted, setGameStarted] = useState(false); // State to track if the game has started
    const titleRef = useRef(null);
    const navigate = useNavigate();
    const playSound = new Audio(PlaySound)
    const winSound = new Audio(WinSound)
    const loseSound = new Audio(LoseSound)

    useEffect(() => {
        startGame();
        won();
    }, [win, draw, end]);


    const startGame = async () => {
        try {
            const response = await fetch(`${apiUrl}/Offline/Start`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ level: difficulty })
            });
            if (response.ok) {
                setGameStarted(true);
            } else {
                throw new Error('Failed to start the game');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const toggle = async (e, num) => {
        if (end || !turn || !gameStarted || data[num]!=='') {
            return 0;
        }
        e.target.innerHTML = `<img src='${cross_icon}'>`;
        data[num] = "x";
        playSound.play()
        setTurn(false);
        
        const botMove = await getBotMove(num, difficulty);
        if (botMove !== null) {
            data[botMove] = "o";
            document.querySelectorAll('.box')[botMove].innerHTML = `<img src='${circle_icon}'>`;
            setTurn(true);
        }
        console.log("player", data)
    };

    const getBotMove = async (playerIndex, difficulty) => {
        try {
            const response = await fetch(`${apiUrl}/Offline/Start`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ level: difficulty, index: playerIndex })
            });
            if (response.ok) {
                const data = await response.json();
                console.log("AI move: ", data);
                setDraw(data.draw)
                setWin(data.win)
                setEnd(data.end)
                return data.index;
            } else {
                throw new Error('Failed to fetch bot move');
            }
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };

const won = () => {
    console.log("Game won status:", win, end);
    if (win && end) {
        titleRef.current.innerHTML = `🎉 Congratulations! You won!`;
        winSound.play()
    }
    if (!win && end) {
        titleRef.current.innerHTML = `😔 Sorry, the AI won.`;
        loseSound.play()
    }
    if (draw && end) {
        titleRef.current.innerHTML = `😐 It's a draw. Good game!`;
        loseSound.play()
    }
};


    return (
        <div className='boardContainer'>
            <h1 className='title' ref={titleRef}>Tic Tac Toe</h1>
            <div className='board'>
                <div className='row1'>
                    <div className='box' onClick={(e) => { toggle(e, 0) }}></div>
                    <div className='box' onClick={(e) => { toggle(e, 1) }}></div>
                    <div className='box' onClick={(e) => { toggle(e, 2) }}></div>
                </div>
                <div className='row2'>
                    <div className='box' onClick={(e) => { toggle(e, 3) }}></div>
                    <div className='box' onClick={(e) => { toggle(e, 4) }}></div>
                    <div className='box' onClick={(e) => { toggle(e, 5) }}></div>
                </div>
                <div className='row3'>
                    <div className='box' onClick={(e) => { toggle(e, 6) }}></div>
                    <div className='box' onClick={(e) => { toggle(e, 7) }}></div>
                    <div className='box' onClick={(e) => { toggle(e, 8) }}></div>
                </div>
            </div>
            {end && <button className='reset' onClick={() => { navigate('/') }}>Exit</button>}
        </div>
    );
};

export default GameSolo;
