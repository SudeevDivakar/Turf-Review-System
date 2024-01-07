const express = require('express');
const router = express.Router();
const Joi = require('joi');

//Requiring models
const User = require('../models/userSchema.js');

//Require utils
const catchAsync = require('../utils/catchAsync.js');
const passport = require('passport');


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


router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.json({ Error: true, message: 'Internal server error' });
      }
      if (!user) {
        return res.json({ Error: true, message: 'Password or Username is Incorrect' });
      }
      return res.json({ Error: false });
    })(req, res, next);
  });
  

module.exports = router;