//Require Dependencies
const express = require('express');
const router = express.Router();

//Require utils
const catchAsync = require('../utils/catchAsync.js');

//Require controllers
const users = require('../controllers/users.js');

//Routes
router.post('/register', catchAsync(users.registerUser));

router.post('/login', catchAsync(users.loginUser));

router.post('/logout', users.logoutUser);

router.get('/profile', catchAsync(users.getUserProfile));

module.exports = router;