// Importing the Express framework
const express = require('express');

// Creating a router instance
const router = express.Router();

// Importing controller functions for user authentication
const { loginUser, registerUser, leaderBoard, getUser, editUser, updateScore, gameLog, getGameLog } = require('../controllers/UserController');

// Defining routes

// Route for user login
router.post('/login', loginUser);

// Route for user registration
router.post('/register', registerUser);

router.post('/leaderboard', leaderBoard);

router.post('/getUser', getUser);

router.post('/editUser', editUser);

router.post('/updateScore', updateScore);

router.post('/gameLog', gameLog);

router.post('/getGameLog', getGameLog);

// Exporting the router module
module.exports = router;
