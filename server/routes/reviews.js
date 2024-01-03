const express = require('express');
const router = express.Router({ mergeParams: true });        //{ mergeParams: true } so that we can use the params from the prefixed route.

// Require Joi schema validations
const { reviewSchema } = require('../schemas.js');


//Require utils
const catchAsync = require('../utils/catchAsync.js');


//Requiring models
const Turf = require('../models/turfSchema.js');
const Review = require('../models/reviewSchema.js');


//Middleware
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else {
        next();
    }
}


//Routes
router.post('/', validateReview, catchAsync(async (req, res) => {
    const turf = await Turf.findById(req.params.id);
    const newReview = new Review(req.body);
    newReview.turfId = req.params.id;
    turf.reviews.push(newReview);
    await newReview.save();
    await turf.save();
    res.json(newReview)
}));


router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Turf.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({ message: 'Review deleted successfully' });
}));


module.exports = router;