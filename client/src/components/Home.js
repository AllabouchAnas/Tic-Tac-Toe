import React from "react";
import xo from '../img/xo.png';
import './Home.css';

// Component for the home page
const Home = () => {
    return (
        <div className="home-container">
            <img src={xo} alt="XO" />
            <div className="text-container">
                <h1>Play XO Online on the #1 Site!</h1>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 13,850,779 <b>Games Today</b> &nbsp;&nbsp;&nbsp; 164,437 <b>Playing Now</b></p>
                <button className="play-online" onClick={() => window.location.href = "/gamequeue"}><i className="fas fa-users"></i> Play Online</button>
                <button className="play-computer" onClick={() => window.location.href = "/gamesolo"}><i className="fas fa-desktop"></i> Play Computer</button>
            </div>
        </div>
    )
}

export default Home;
