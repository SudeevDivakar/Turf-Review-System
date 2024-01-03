const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    review: String,
    rating: Number,
    turfId: {
        type: Schema.Types.ObjectId,
        ref: 'Turf'
    }
});

reviewSchema.post('findOneAndDelete', async function (doc, next) {
    if (doc) {
        const Turf = mongoose.model('Turf');
        const turf = await Turf.findById(doc.turfId).populate('reviews');
        if (turf && turf.reviews.length > 0) {
            const reviewsList = turf.reviews;
            let avgRating = 0;
            for (let review of reviewsList) {
                avgRating += review.rating;
            }
            avgRating /= reviewsList.length;
            turf.rating = avgRating;
            await Turf.findOneAndUpdate({ _id: turf._id }, { rating: avgRating });
        }
        else if(turf.reviews.length === 0){
            await Turf.findOneAndUpdate({ _id: turf._id }, { rating: 0 });
        }
    }
    next();
});

module.exports = mongoose.model('Review', reviewSchema);