const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//Require middleware
const { checkAuth, validateTurf, isAuthor } = require('../middleware.js');

//Require utils
const catchAsync = require('../utils/catchAsync.js');

//Requiring models
const User = require('../models/userSchema.js');
const Turf = require('../models/turfSchema.js');

//Requiring .env file
require('dotenv').config({ path: '../.env' });

//Routes
router.get('/', catchAsync(async (req, res) => {
    const turfs = await Turf.find({});
    res.json(turfs);
}));


router.post('/new', checkAuth, validateTurf, catchAsync(async (req, res) => {
    const { token } = req.cookies;
    let username;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            username = user.username;
        })
    }
    const user = await User.findOne({ username })
    const turf = await Turf.create({
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description,
        location: req.body.location,
        author: user
    });
    res.json(turf);
}));


router.get('/:id', catchAsync(async (req, res) => {
    const turf = await Turf.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author',
            select: 'username'
        }
    }).populate('author');
    res.json(turf);
}));


router.patch('/:id', checkAuth, isAuthor, validateTurf, catchAsync(async (req, res) => {
    const newTurf = await Turf.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
    res.json({ Error: false, newTurf });
}));


router.delete('/:id', isAuthor, catchAsync(async (req, res) => {
    const response = await Turf.findByIdAndDelete(req.params.id);
    res.json(response);
}));


module.exports = router;