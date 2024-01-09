const express = require('express');
const router = express.Router({ mergeParams: true });        //{ mergeParams: true } so that we can use the params from the prefixed route.

//Requiring Middleware
const { validateReview, checkAuth, isReviewAuthor } = require('../middleware.js');

//Require utils
const catchAsync = require('../utils/catchAsync.js');

//Require controllers
const reviews = require('../controllers/reviews.js');

//Routes
router.post('/', checkAuth, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;