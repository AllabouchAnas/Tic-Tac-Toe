// Importing the User model
const { User, Game } = require('../models/UserModel');

const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.login(username, password);

        const token = createToken(user._id);

        res.status(200).json({ username, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Register Controller
const registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.register(username, password);

        const token = createToken(user._id);

        res.status(200).json({ username, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getUser = async (req, res) => {
    const username = req.body.username;

    try {
        const user = await User.findOne({ username: username });

        if (!user) {
            throw new Error('User not found');
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}


const editUser = async (req, res) => {
    const { oldUsername, newUsername, newPassword } = req.body;

    try {
        const user = await User.edit(oldUsername, newUsername, newPassword);

        if (!user) {
            throw new Error('User not found');
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const leaderBoard = async (req, res) => {
    try {
        const leaderboardData = await User.find({}, { 'username': 1, 'score': 1}).sort({ score: -1 }).limit(7);
        
        res.status(200).json(leaderboardData);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateScore = async (req, res) => {
        const { username, score, won } = req.body;

    try {
        const user = await User.update(username, score, won);

        if (!user) {
            throw new Error('User not found');
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const gameLog = async (req, res) => {
    const { username, won, opponent } = req.body;

    try {
        const user1 = await User.findOne({ username: username });
        const game1 = await Game.log(username, user1.score, won, opponent);

        const user2 = await User.findOne({ username: opponent });
        const game2 = await Game.log(opponent, user2.score, !won, username);

        res.status(200).json({ game1, game2 });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getGameLog = async (req, res) => {
    const { username } = req.body;

    try {
        const gameLog = await Game.aggregate([
            {
                $match: {
                    $or: [
                        { username: username },
                        { opponent: username }
                    ]
                }
            },
            {
                $match: { username: username }
            },
            {
                $sort: { createdAt: -1 }
            },
            {
                $project: {
                    _id: 1,
                    username: 1,
                    score: 1,
                    won: 1,
                    opponent: 1,
                    opponentScore: {
                        $cond: {
                            if: { $eq: ["$username", username] },
                            then: "$score",
                            else: { $ifNull: ["$opponentScore", null] } 
                        }
                    },
                    createdAt: 1
                }
            }
        ]);

        res.status(200).json({ gameLog });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



module.exports = {
    loginUser,
    registerUser,
    getUser,
    editUser,
    leaderBoard,
    updateScore,
    gameLog,
    getGameLog
}