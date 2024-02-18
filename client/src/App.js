import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import components and pages
import Home from './components/Home';
import Login from './components/authentication/pages/Login';
import Register from './components/authentication/pages/Register';
import Navbar from './components/Navbar';
import GameBoard from './components/game/board/GameBoard'

function App() {
  return (
    <div className="App">
      {/* Set up BrowserRouter for routing */}
      <BrowserRouter>
        {/* Include the Navbar component for navigation */}
        <Navbar />
        <div className="pages">
          {/* Define routes for different pages */}
          <Routes>
            {/* Route for the home page */}
            <Route 
              path="/"
              element={<Home />}
            />
            {/* Route for the login page */}
            <Route 
              path="/login" 
              element={<Login />} 
            />
            {/* Route for the register page */}
            <Route 
              path="/register" 
              element={<Register />} 
            />
            {/* Route for the game board page */}
            <Route 
              path="/gameboard" 
              element={<GameBoard />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
