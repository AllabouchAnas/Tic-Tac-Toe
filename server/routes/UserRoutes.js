const express = require('express');
const router = express.Router();

//Controller functions
const { loginUser, registerUser } = require('../controllers/UserController');

// Login Route
router.post('/login', loginUser);

// Register Route
router.post('/register', registerUser);

module.exports = router