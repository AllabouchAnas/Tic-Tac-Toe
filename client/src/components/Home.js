import React from "react";
import xo from '../img/xo.png';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <img src={xo} alt="XO" />
            <div className="text-container">
                <h1>Play XO Online on the #1 Site!</h1>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 13,850,779 <b>Games Today</b> &nbsp;&nbsp;&nbsp; 164,437 <b>Playing Now</b></p>
                <button className="play-online" onClick={() => window.location.href = "/gameonline"}><i className="fas fa-users"></i> Play Online</button>
                <button className="play-computer" onClick={() => window.location.href = "/gamesolo"}><i className="fas fa-desktop"></i> Play Computer</button>
            </div>
            <div className="footer">
                <p>Copyright © 2024. Made with ❤️ by <a href='https://github.com/AllabouchAnas' target="_blank" rel="noreferrer">A&H</a></p>
            </div>
        </div>
    )
}

export default Home;
