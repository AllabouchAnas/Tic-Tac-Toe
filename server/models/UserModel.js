// Importing necessary packages and modules
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

// Getting the Schema object from mongoose
const Schema = mongoose.Schema;

// Defining the user schema
const userSchema = new Schema({
    email: { type: String, required: true, unique: true }, // Email field with required and unique constraints
    password: { type: String, required: true } // Password field with required constraint
});

// Static login method for the user schema
userSchema.statics.login = async function(email, password) {
    // Validation to ensure both email and password are provided
    if(!email || !password) throw new Error('All fields are required!');

    // Finding the user by email
    const user = await this.findOne({ email });    

    // Error handling if user is not found
    if(!user) throw new Error('Invalid email!');

    // Comparing the provided password with the hashed password stored in the database
    const match  = await bcrypt.compare(password, user.password);

    // Error handling for incorrect password
    if (!match) throw new Error('Incorrect password!');
    
    return user; // Returning the user if login is successful
}

// Static register method for the user schema
userSchema.statics.register = async function(email, password) {
    // Validation to ensure both email and password are provided
    if(!email || !password) throw new Error('All fields are required!');

    // Validating email format using validator
    if(!validator.isEmail(email)) throw new Error('Email is not valid!');

    // Validating password strength using validator
    if(!validator.isStrongPassword(password)) throw new Error('Password is not strong enough!');

    // Checking if the user already exists
    const exists = await this.findOne({ email });
    if(exists) throw new Error('User already exists!');

    // Generating salt and hashing the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Creating a new user with the hashed password
    const user = await this.create({ email, password: hash });
    return user; // Returning the newly created user
}

// Exporting the Mongoose model with the defined schema
module.exports = mongoose.model('User', userSchema);
