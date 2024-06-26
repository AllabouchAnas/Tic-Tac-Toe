  import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';

  // Import components and pages
  import Home from './components/Home';
  import Login from './components/authentication/pages/Login';
  import Register from './components/authentication/pages/Register';
  import SideBar from './components/menu/SideBar';
  import GameBoard from './components/game/board/GameBoard'
  import GameOnline from './components/game/online/GameOnline'
  import GameSolo from  './components/game/solo/BotLevel';
  import GameQueue from './components/game/online/GameQueue'
  import LeaderBoard from './components/leaderBoard/LeaderBord';
  import Profile from './components/profile/Profile';
  import EditProfile from './components/profile/EditProfile';
  import GameLog from './components/game/log/GameLog';

  function App() {
    const isAuth = localStorage.getItem('user')
    

    return (
      <div className="App">
        <BrowserRouter>
          <SideBar />
          <div className="pages">
            <Routes>
              <Route 
                path="/"
                element={<Home />}
              />
              <Route 
                path="/leaderboard"
                element={<LeaderBoard />}
              />
              <Route 
                path="/login" 
                element={isAuth ? <Navigate to="/" /> : <Login />}
              />
              <Route 
                path="/register" 
                element={isAuth ? <Navigate to="/" /> : <Register />} 
              />
              <Route 
                path="/gameboard" 
                element={<GameBoard />} 
              />
              <Route 
                path="/gameonline" 
                element={!isAuth ? <Navigate to="/login" /> : <GameQueue />} 
              />
              <Route 
                path="/profile" 
                element={!isAuth ? <Navigate to="/login" /> : <Profile />} 
              />
              <Route 
                path="/editprofile" 
                element={!isAuth ? <Navigate to="/login" /> : <EditProfile />} 
              />
              <Route 
                path="/gamesolo" 
                element={<GameSolo />} 
              />
              <Route 
                path="/gamelog" 
                element={!isAuth ? <Navigate to="/login" /> : <GameLog />} 
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }

  export default App;
