const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true }, 
    password: { type: String, required: true }, 
    score: { type: Number, default: 400 },
    won: { type: Number, default: 0 },
    lost: { type: Number, default: 0 },
    draw: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const gameSchema = new Schema({
    username: { type: String, required: true },
    score: { type: Number, required: true}, 
    won: { type: Boolean, required: true },
    opponent: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

userSchema.statics.login = async function(username, password) {
    if(!username || !password) throw new Error('All fields are required!');

    const user = await this.findOne({ username });    

    if(!user) throw new Error('Invalid username!');

    const match  = await bcrypt.compare(password, user.password);

    if (!match) throw new Error('Incorrect password!');
    
    return user; 
}

userSchema.statics.register = async function(username, password) {
    if(!username || !password) throw new Error('All fields are required!');

    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; 
    if(!usernameRegex.test(username)) throw new Error('Username is not valid!');

    if(!validator.isStrongPassword(password)) throw new Error('Password is not strong enough!');

    const exists = await this.findOne({ username });
    if(exists) throw new Error('User already exists!');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ username, password: hash });
    return user;
}

userSchema.statics.edit = async function(oldUsername, newUsername, newPassword) {
    if (!newUsername || !newPassword) throw new Error('All fields are required!');

    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; 
    if (!usernameRegex.test(newUsername)) throw new Error('Username is not valid!');

    if (!validator.isStrongPassword(newPassword)) throw new Error('Password is not strong enough!');

    const user = await this.findOne({ username: oldUsername });
    if (!user) throw new Error('User not found!');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    user.username = newUsername;
    user.password = hash;
    user.updatedAt = Date.now();

    await user.save(); 

    return user; 
}

userSchema.statics.update = async function(username, score, won) {

    const user = await this.findOne({ username: username }, {username: 1, score: 1, won: 1, lost:1});
    if (!user) throw new Error('User not found!');

    user.score += score;
    if (won === true) user.won++; else user.lost++ ;
    await user.save();

    return user; 
}

gameSchema.statics.log = async function(username, score, won, opponent) {
    const game = await this.create({ username: username, score: score, won: won, opponent: opponent });
    if (!game) throw new Error('Error!');
    return game;
}



// Exporting the Mongoose models with the defined schemas
module.exports = {
    User: mongoose.model('User', userSchema),
    Game: mongoose.model('Game', gameSchema)
};

