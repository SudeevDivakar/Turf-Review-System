const express = require('express');
const router = express.Router();
const Joi = require('joi');
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
        res.json({ Error: false, registeredUser });
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


module.exports = router;