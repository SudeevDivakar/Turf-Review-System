const Joi = require('joi');               //To verify Email
const jwt = require('jsonwebtoken');      //To handle authentication

//Requiring BCRYPT util functions
const { hashPassword, comparePassword } = require('../utils/auth.js');

//Requiring models
const User = require('../models/userSchema.js');

//Requiring .env file
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const registerUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        
        const emailValidation = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).validate(email);
        if (emailValidation.error) {
            throw new Error('Invalid email format');
        }

        const emailExist = await User.findOne({email});
        if (emailExist) {
            throw new Error('Email Already Taken');
        }

        const usernameExist = await User.findOne({username});
        if(usernameExist){
            throw new Error('Username Already Taken');
        }

        const hashedPassword = await hashPassword(password);

        const registeredUser = await User.create({ email, username, password: hashedPassword });
        jwt.sign({ username: registeredUser.username, id: registeredUser._id, email: registeredUser.email }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
            if(err) throw err;
            res.cookie('token', token).json({ Error: false, registeredUser });
        });
    }
    catch (err) {
        if (err.message === 'Invalid email format') {
            res.json({ Error: true, message: err.message });
        } 
        else if (err.message === 'Email Already Taken') {
            res.json({ Error: true, message: err.message });
        }
        else if (err.message === 'Username Already Taken') {
            res.json({ Error: true, message: err.message });
        }
    }
};

const loginUser = async (req, res) => {
    try{
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if(!user){
            throw new Error('User not Registered. Sign Up Now!');
        }

        const match = await comparePassword(password, user.password);
        if(match){
            jwt.sign({ username: user.username, id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user);
            })
        }
        else{
            throw new Error('Incorrect Password');
        }
    }
    catch(err){
        if(err.message === 'User not Registered. Sign Up Now!') res.json({ Error: true, message: err.message });
        else if(err.message === 'Incorrect Password') res.json({ Error: true, message: err.message });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie('token').status(200).json({ message: 'Logged out successfully' });
};

const getUserProfile = async(req, res) => {
    const { token } = req.cookies;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user);
        })
    }
    else{
        res.json(null);
    }
}


module.exports = { registerUser, loginUser, logoutUser, getUserProfile };