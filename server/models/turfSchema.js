const mongoose = require('mongoose');
const Review = require('./reviewSchema.js');
const Schema = mongoose.Schema;

const turfSchema = new Schema({
    name: String,
    image: [
        { 
            url: String,
            filename: String,
            originalname: String
        }
    ],
    price: Number,
    rating: Number,
    description: String,
    latitude: Number,
    longitude: Number,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

//Post mongoose middleware to delete all reviews associated with a turf whenever a turf is deleted
turfSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({ _id: { $in: doc.reviews } });
    }
});

//Post mongoose middleware to calculate the average turf rating everytime a review is added to a turf
turfSchema.post('save', async function () {
    const turf = await this.constructor.findById(this._id).populate('reviews');
    if (turf && turf.reviews.length > 0) {
        const reviewsList = turf.reviews;
        let avgRating = 0;
        for (let review of reviewsList) {
            avgRating += review.rating;
        }
        avgRating /= reviewsList.length;
        turf.rating = avgRating;
        await this.constructor.findOneAndUpdate({ _id: this._id }, { rating: avgRating });
    }
})

module.exports = mongoose.model('Turf', turfSchema);