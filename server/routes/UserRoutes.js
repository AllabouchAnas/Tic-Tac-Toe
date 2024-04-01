const express = require('express');

const router = express.Router();

const { loginUser, registerUser, leaderBoard, getUser, editUser, updateScore, gameLog, getGameLog } = require('../controllers/UserController');


router.post('/login', loginUser);

router.post('/register', registerUser);

router.post('/leaderboard', leaderBoard);

router.post('/getUser', getUser);

router.post('/editUser', editUser);

router.post('/updateScore', updateScore);

router.post('/gameLog', gameLog);

router.post('/getGameLog', getGameLog);

module.exports = router;
