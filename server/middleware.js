const jwt = require('jsonwebtoken');

//Require Models
const User = require('./models/userSchema.js');
const Turf = require('./models/turfSchema.js');
const Review = require('./models/reviewSchema.js');

// Require Joi schema validations
const { turfSchema, reviewSchema } = require('./schemas.js');

//Require utils
const ExpressError = require('./utils/ExpressError.js');

//Require .env contents
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

//Middleware for user authentication
const checkAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        // If no token is present, the user is not signed in
        return res.status(401).json({ Error: true, message: 'Unauthorized - User not signed in' });
    }

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user exists in the database
        const user = await User.findById(decoded.id);

        if (!user) {
            // If the user does not exist, treat it as unauthorized
            return res.status(401).json({ Error: true, message: 'Unauthorized - Invalid user' });
        }
        next();
    } catch (err) {
        // If the token verification fails, treat it as unauthorized
        return res.status(401).json({ Error: true, message: 'Unauthorized - Invalid token' });
    }
};

//Middleware to check whether turf is valid according to the JOI schema validations
const validateTurf = (req, res, next) => {
    const { error } = turfSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else {
        next();
    }
};

//Middleware to check whether the user has made the turf currently being viewed
const isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const { token } = req.cookies;
    const user = await Turf.findById(id).populate('author');
    if (!token) {
        return res.status(401).json({ Error: true, message: 'Unauthorized - User not signed in' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.username === user.author.username) {
            next();
        }
        else {
            return res.json({ Error: true, message: 'Unauthorized - Invalid user' });
        }
    }
    catch {
        return res.status(401).json({ Error: true, message: 'Unauthorized - Invalid token' });
    }
};

////Middleware to check whether review is valid according to the JOI schema validations
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else {
        next();
    }
};

//Middleware to check whether the user wrote a review
const isReviewAuthor = async (req, res, next) => {
    const { reviewId } = req.params;
    const { token } = req.cookies;
    const review = await Review.findById(reviewId).populate('author');
    if (!token) {
        return res.status(401).json({ Error: true, message: 'Unauthorized - User not signed in' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.username === review.author.username) {
            next();
        }
        else {
            return res.json({ Error: true, message: 'Unauthorized - Invalid user' });
        }
    }
    catch {
        return res.status(401).json({ Error: true, message: 'Unauthorized - Invalid token' });
    }
};

module.exports = { checkAuth, validateTurf, isAuthor, validateReview, isReviewAuthor };
