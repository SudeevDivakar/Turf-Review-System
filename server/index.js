//Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const catchAsync = require('./utils/catchAsync.js');
const ExpressError = require('./utils/ExpressError.js');
const { turfSchema, reviewSchema } = require('./schemas.js')
const cors = require('cors');
const Turf = require('./models/turfSchema.js');
const Review = require('./models/reviewSchema.js');

if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}

//Connect to MongoDB
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('DATABASE CONNECTION OPEN')
    })
    .catch(() => {
        console.log('ERROR IN DATABASE CONNECTION')
    });


//Create Express app
const app = express();


//Configure Express app
app.use(express.json());
app.use(cors());


//Middleware
const validateTurf = (req, res, next) => {
    const { error } = turfSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else{
        next();
    }
}

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if( error ) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else{
        next();
    }
}


//Routing
app.get('/turfs', catchAsync(async (req, res) => {
    const turfs = await Turf.find({});
    res.json(turfs);
}));

app.post('/turfs/new', validateTurf, catchAsync(async (req, res) => {
    const turf = await Turf.create({
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description,
        location: req.body.location
    });
    res.json(turf);
}));

app.get('/turfs/:id', catchAsync(async (req, res) => {
    const turf = await Turf.findById(req.params.id).populate('reviews');
    res.json(turf);
}));

app.patch('/turfs/:id', validateTurf, catchAsync(async (req, res) => {
    const newTurf = await Turf.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
    res.json(newTurf);
}));

app.delete('/turfs/:id', catchAsync(async (req, res) => {
    const response = await Turf.findByIdAndDelete(req.params.id);
    res.json(response);
}));

app.post('/turfs/:id/reviews', validateReview, catchAsync(async(req, res) => {
    const turf = await Turf.findById(req.params.id);
    const newReview = new Review(req.body);
    newReview.turfId = req.params.id;
    turf.reviews.push(newReview);
    await newReview.save();
    await turf.save();
    res.json(newReview)
}))

app.delete('/turfs/:id/reviews/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Turf.findByIdAndUpdate(id, { $pull: { reviews: reviewId }});
    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({ message: 'Review deleted successfully' });
}))

app.get('/pageNotFound', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
});

app.use((err, req, res, next) => {
    const { message = 'Something Went Wrong' , statusCode = 500 } = err;
    res.status(statusCode).send(message);
});


//Start server
app.listen(process.env.PORT, () => {
    console.log('Listening on port 3000');
})