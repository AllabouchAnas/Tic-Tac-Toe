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
    // Destructuring email and password from the request body
    const { email, password } = req.body;

    try {
        // Attempting to log in the user
        const user = await User.login(email, password);

        // Creating a token for the user
        const token = createToken(user._id);

        // Sending the email and token in the response
        res.status(200).json({ email, token });
    } catch (error) {
        // Handling errors if login fails
        res.status(400).json({ error: error.message });
    }
}

// Register Controller
const registerUser = async (req, res) => {
    // Destructuring email and password from the request body
    const { email, password } = req.body;

    try {
        // Attempting to register the user
        const user = await User.register(email, password);

        // Creating a token for the user
        const token = createToken(user._id);

        // Sending the email and token in the response
        res.status(200).json({ email, token });
    } catch (error) {
        // Handling errors if registration fails
        res.status(400).json({ error: error.message });
    }
}

// Exporting the login and register controller functions
module.exports = {
    loginUser,
    registerUser
}
