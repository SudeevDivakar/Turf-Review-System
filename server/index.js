//Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const turfController = require('./controllers/turfController.js');
const catchAsync = require('./utils/catchAsync.js');
const ExpressError = require('./utils/ExpressError.js');
const { turfSchema } = require('./schemas.js')
const cors = require('cors');

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


//Routing
app.get('/turfs', catchAsync(turfController.displayAllTurfs));

app.post('/turfs/new', validateTurf, catchAsync(turfController.addTurf));

app.get('/turfs/:id', catchAsync(turfController.displayTurf));

app.patch('/turfs/:id', validateTurf, catchAsync(turfController.updateTurf));

app.delete('/turfs/:id', catchAsync(turfController.deleteTurf));

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