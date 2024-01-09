const express = require('express');
const router = express.Router({ mergeParams: true });        //{ mergeParams: true } so that we can use the params from the prefixed route.
const jwt = require('jsonwebtoken');


//Requiring Middleware
const { validateReview, checkAuth, isReviewAuthor } = require('../middleware.js');


//Require utils
const catchAsync = require('../utils/catchAsync.js');


//Requiring models
const Turf = require('../models/turfSchema.js');
const Review = require('../models/reviewSchema.js');
const User = require('../models/userSchema.js');


//Routes
router.post('/', checkAuth, validateReview, catchAsync(async (req, res) => {
    const { token } = req.cookies;
    let userId;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            userId = user.id;
        })
    }
    const user = await User.findById(userId)
    const turf = await Turf.findById(req.params.id);
    const newReview = new Review(req.body);
    newReview.turfId = req.params.id;
    newReview.author = user;
    turf.reviews.push(newReview);
    await newReview.save();
    await turf.save();
    res.json(newReview)
}));


router.delete('/:reviewId', isReviewAuthor, catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Turf.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({ message: 'Review deleted successfully' });
}));


module.exports = router;