const mongoose = require('mongoose');
const Review = require('./reviewSchema.js');
const Schema = mongoose.Schema;

const turfSchema = new Schema({
    name: String,
    image: String,
    price: Number,
    rating: Number,
    description: String,
    location: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

turfSchema.post('findOneAndDelete', async function(doc) {
    if(doc){
        await Review.deleteMany({ _id: { $in: doc.reviews } });
    }
});

module.exports = mongoose.model('Turf', turfSchema);