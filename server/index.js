//Import dependencies
const express = require('express');
const mongoose = require('mongoose');

//Require utils
const ExpressError = require('./utils/ExpressError.js');

// Used to recieve requests from other servers 
const cors = require('cors');

//Requiring routes
const turfs = require('./routes/turfs.js');
const reviews = require('./routes/reviews.js');

//Require Environment Variables
require('dotenv').config();


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


//Configure Express app & other middleware
app.use(express.json());
app.use(cors());


//Routing
app.use('/turfs', turfs);

app.use('/turfs/:id/reviews', reviews);

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
});