const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Static login method
userSchema.statics.login = async function(email, password) {
    if(!email || !password) throw new Error('All fields are required!');
    const user = await this.findOne({ email });    
    if(!user) throw new Error('Invalid email!');
    const match  = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Incorrect password!');
    
    return user;
}

// Static register method
userSchema.statics.register = async function(email, password) {
    // Validation 
    if(!email || !password) throw new Error('All fields are required!');
    if(!validator.isEmail(email)) throw new Error('Email is not valid!');
    if(!validator.isStrongPassword(password)) throw new Error('Password is not strong enough!');

    const exists = await this.findOne({ email });
    if(exists) throw new Error('User already exists!');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash });
    return user;
}

module.exports = mongoose.model('User', userSchema);
