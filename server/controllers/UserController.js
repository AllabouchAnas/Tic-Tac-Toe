// Importing the User model
const User = require('../models/UserModel');

// Importing the jsonwebtoken package
const jwt = require("jsonwebtoken");

// Function to create a token with user id
const createToken = (_id) => {
    // Creating a JWT token with the user id and the specified secret key
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

// Login Controller
const loginUser = async (req, res) => {
    // Destructuring username and password from the request body
    const { username, password } = req.body;

    try {
        // Attempting to log in the user
        const user = await User.login(username, password);

        // Creating a token for the user
        const token = createToken(user._id);

        // Sending the username and token in the response
        res.status(200).json({ username, token });
    } catch (error) {
        // Handling errors if login fails
        res.status(400).json({ error: error.message });
    }
}

// Register Controller
const registerUser = async (req, res) => {
    // Destructuring username and password from the request body
    const { username, password } = req.body;

    try {
        // Attempting to register the user
        const user = await User.register(username, password);

        // Creating a token for the user
        const token = createToken(user._id);

        // Sending the username and token in the response
        res.status(200).json({ username, token });
    } catch (error) {
        // Handling errors if registration fails
        res.status(400).json({ error: error.message });
    }
}

const getUser = async (req, res) => {
    const username = req.body.username;

    try {
        // Attempting to fetch the user
        const user = await User.findOne({ username: username });

        if (!user) {
            throw new Error('User not found');
        }

        // Sending the user data in the response
        res.status(200).json(user);
    } catch (error) {
        // Handling errors if user retrieval fails
        res.status(404).json({ error: error.message });
    }
}


// editUser Controller
const editUser = async (req, res) => {
    const { oldUsername, newUsername, newPassword } = req.body;

    try {
        // Attempting to find the user by userId
        const user = await User.edit(oldUsername, newUsername, newPassword);

        if (!user) {
            throw new Error('User not found');
        }

        // Sending the updated user data in the response
        res.status(200).json(user);
    } catch (error) {
        // Handling errors if user editing fails
        res.status(400).json({ error: error.message });
    }
}


const leaderBoard = async (req, res) => {
    try {
        // Fetch leaderboard data from the database, you would need to adjust this based on your schema
        const leaderboardData = await User.find({}, { 'username': 1, 'score': 1}).sort({ score: -1 }).limit(7);
        
        // Send the leaderboard data in the response
        res.status(200).json(leaderboardData);
    } catch (error) {
        // Handle errors if fetching leaderboard data fails
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Exporting the login and register controller functions
module.exports = {
    loginUser,
    registerUser,
    getUser,
    editUser,
    leaderBoard
}