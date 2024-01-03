const express = require('express');
const router = express.Router();


//Require utils
const catchAsync = require('../utils/catchAsync.js');


//Requiring models
const Turf = require('../models/turfSchema.js');


//Middleware
const validateTurf = (req, res, next) => {
    const { error } = turfSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else {
        next();
    }
}


// Require Joi schema validations
const { turfSchema } = require('../schemas.js');


//Routes
router.get('/', catchAsync(async (req, res) => {
    const turfs = await Turf.find({});
    res.json(turfs);
}));


router.post('/new', validateTurf, catchAsync(async (req, res) => {
    const turf = await Turf.create({
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description,
        location: req.body.location
    });
    res.json(turf);
}));


router.get('/:id', catchAsync(async (req, res) => {
    const turf = await Turf.findById(req.params.id).populate('reviews');
    res.json(turf);
}));


router.patch('/:id', validateTurf, catchAsync(async (req, res) => {
    const newTurf = await Turf.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
    res.json(newTurf);
}));


router.delete('/:id', catchAsync(async (req, res) => {
    const response = await Turf.findByIdAndDelete(req.params.id);
    res.json(response);
}));


module.exports = router;