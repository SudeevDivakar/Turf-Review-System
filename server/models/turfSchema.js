const mongoose = require('mongoose');

const turfSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String
    },
    location: {
        type: String,
        required: true  
    }
});

module.exports = mongoose.model('Turf', turfSchema);