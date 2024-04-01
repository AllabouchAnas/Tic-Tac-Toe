import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import './Profile.css'; // Import the CSS file containing styles
import Chart from './ChartProfile';

function Profile() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook

  const handleEditProfile = () => {
    navigate('/editprofile'); // Use navigate instead of history.push
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/user/getUser', {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: JSON.parse(localStorage.getItem('user')).username }) // Set the username in the body
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  // Function to determine the role based on the score
  const getRoleFromScore = (score) => {
    if (score < 500) {
      return 'Noob';
    } else if (score >= 500 && score < 1000) {
      return 'Beginner';
    } else if (score >= 1000 && score < 1500) {
      return 'Intermediate';
    } else if (score >= 1500 && score < 2000) {
      return 'Advanced';
    } else {
      return 'Expert';
    }
  };

  return (
    <div className='profile'>
      <div className="profile-card">
        <div className="tic-tac-toe-icons">
          <i className="fas fa-times"></i>
        </div>
        <div className="profile-picture">
          <img src="https://randomuser.me/api/portraits/lego/6.jpg" alt="Profile Picture" />
        </div>
        <div className="profile-details">
          <div className="profile-info">
            <h1>{userData?.username.toUpperCase() || "Loading..."}</h1>
            <p>Role: {getRoleFromScore(userData?.score) || "Loading..."}</p>
          </div>
          <div className="score">Player Score: {userData?.score || "Loading..."}</div>
        </div>
        <button className="edit-button" onClick={handleEditProfile}>
          <i className="fas fa-edit"></i> Edit Profile
        </button>
      </div>
      {userData && <Chart won={userData.won} lost={userData.lost} draw={userData.draw} />}
    </div>
  );
}

export default Profile;
