import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaSignInAlt, FaSignOutAlt, FaGamepad, FaUserFriends, FaTrophy, FaRobot, FaHistory } from 'react-icons/fa';
import { useLogout } from '../authentication/hooks/useLogout';
import { useAuthContext } from '../authentication/hooks/useAuthContext';
import './SideBar.css';
import Logo from '../../img/logo.png'

const SideBar = () => {
  const { logout } = useLogout();
  const { user, setUser } = useAuthContext();

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <header>
      <nav className="sidebar">
        <Link to="/" className="logo">
          {/* <h1>Tic Tac Toe</h1> */}
          <img src={ Logo }></img>
        </Link>
        <div className="sidebar-links">
          <Link to="/">
            <FaHome /> Home
          </Link>
          <Link to="/leaderboard">
            <FaTrophy /> Leader Board
          </Link>
          <Link to="/gameboard">
            <FaGamepad /> Game Board
          </Link>
          <Link to="/gameonline">
            <FaUserFriends /> Game Online
          </Link>
          <Link to="/gamesolo">
            <FaRobot /> Game Solo
          </Link>
          <Link to="/gamelog">
            <FaHistory /> Game Log
          </Link>
        </div>
        {user &&
          <div className="user-info">
            <Link to="/profile">
            <FaUser /> {user.username.toUpperCase()}
            </Link>
            <Link to="/" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </Link>
          </div>
        }
        {!user && 
          <div className="auth-links">
            <Link to="/login">
              <FaSignInAlt /> Login
            </Link>
            <Link to="/register">
              <FaUser /> Register
            </Link>
          </div>
        }
      </nav>
    </header>
  );
};

export default SideBar;
