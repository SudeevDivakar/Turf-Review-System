//Require Dependencies
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

//Requiring BCRYPT util functions
const { hashPassword, comparePassword } = require('../utils/auth.js');

//Requiring models
const User = require('../models/userSchema.js');

//Require utils
const catchAsync = require('../utils/catchAsync.js');


//Routes
router.post('/register', catchAsync(async (req, res) => {
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
        })
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
}));

router.post('/login', catchAsync(async (req, res) => {
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
}));

router.post('/logout', (req, res) => {
    res.clearCookie('token').json({ message: 'Logged out successfully' });
})

router.get('/profile', async(req, res) => {
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
})


module.exports = router;