import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import components and pages
import Home from './components/Home';
import Login from './components/authentication/pages/Login';
import Register from './components/authentication/pages/Register';
import SideBar from './components/menu/SideBar';
import GameBoard from './components/game/board/GameBoard'
import GameOnline from './components/game/online/GameOnline'


function App() {
  return (
    <div className="App">
      {/* Set up BrowserRouter for routing */}
      <BrowserRouter>
        {/* Include the Navbar component for navigation */}
        <SideBar />
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
            <Route 
              path="/gameonline" 
              element={<GameOnline />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
