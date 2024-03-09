import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaSignInAlt, FaSignOutAlt, FaGamepad, FaUserFriends, FaTrophy } from 'react-icons/fa';
import { useLogout } from '../authentication/hooks/useLogout';
import { useAuthContext } from '../authentication/hooks/useAuthContext';
import './SideBar.css';
import Logo from '../../img/logo.png'

const SideBar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
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
        </div>
        {user ? (
          <div className="user-info">
            <Link to="/profile">
            <FaUser /> {user.username.toUpperCase()}
            </Link>
            <Link to="#" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </Link>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login">
              <FaSignInAlt /> Login
            </Link>
            <Link to="/register">
              <FaUser /> Register
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default SideBar;
