// Importing the Express framework
const express = require('express');

// Creating a router instance
const router = express.Router();

// Importing controller functions for user authentication
const { loginUser, registerUser, leaderBoard } = require('../controllers/UserController');

// Defining routes

// Route for user login
router.post('/login', loginUser);

// Route for user registration
router.post('/register', registerUser);

router.post('/leaderboard', leaderBoard);

// Exporting the router module
module.exports = router;
