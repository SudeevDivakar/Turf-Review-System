const express = require('express');
const router = express.Router();
const Joi = require('joi');

//Requiring models
const User = require('../models/userSchema.js');

//Require utils
const catchAsync = require('../utils/catchAsync.js');


//Routes
router.post('/register', catchAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const emailValidation = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).validate(email);
        if(emailValidation.error){
            throw new Error('Email Not Valid');
        }
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        res.json({ Error: false, registeredUser });
    }
    catch(err){
        if (err.message === 'Email Not Valid') {
            res.json({ Error: true, message: 'Invalid email format' });
        } else if (err.message === 'A user with the given username is already registered' || err.code === 11000) {
            res.json({ Error: true, message: 'Credentials Already Taken' });
        }
    }
}));

module.exports = router;