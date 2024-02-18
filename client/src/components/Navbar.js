import { Link } from 'react-router-dom';
import { useLogout } from '../components/authentication/hooks/useLogout';
import { useAuthContext } from '../components/authentication/hooks/useAuthContext';

// Component for the navigation bar
const Navbar = () => {
  // Access the logout function from the useLogout hook
  const { logout } = useLogout();

  // Access user data from the authentication context using useAuthContext hook
  const { user } = useAuthContext();

  // Handle click event for logout button
  const handleClick = () => {
    logout(); // Call the logout function
  };

  return (
    <header>
      <div className="container">
        {/* Link to the home page */}
        <Link to="/">
          <h1>Tic Tac Toe</h1>
        </Link>
        {/* Navigation links */}
        <nav>
          {/* Display user information and logout button if user is logged in */}
          {user && (
            <div>
              <span>{ user.email }</span> {/* Display user email */}
              <button onClick={ handleClick }>Log out</button> {/* Logout button */}
            </div>
          )}
          {/* Display login and register links if user is not logged in */}
          {!user && (
            <div>
              <Link to="/login">Login</Link> {/* Link to login page */}
              <Link to="/register">Register</Link> {/* Link to register page */}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
