const jwt = require('jsonwebtoken');

//Requiring models
const Turf = require('../models/turfSchema.js');
const Review = require('../models/reviewSchema.js');
const User = require('../models/userSchema.js');

//Requiring .env file
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '../.env' });
}

const createReview = async (req, res) => {
    const { token } = req.cookies;
    let userId;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            userId = user.id;
        })
    }
    const user = await User.findById(userId);
    const turf = await Turf.findById(req.params.id);
    const newReview = new Review(req.body);
    newReview.turfId = req.params.id;
    newReview.author = user;
    turf.reviews.push(newReview);
    await newReview.save();
    await turf.save();
    res.json(newReview);
};

const deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Turf.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({ message: 'Review deleted successfully' });
};

module.exports = { createReview, deleteReview };