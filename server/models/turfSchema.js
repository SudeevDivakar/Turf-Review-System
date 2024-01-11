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

turfSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({ _id: { $in: doc.reviews } });
    }
});

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