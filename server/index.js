//Import dependencies
const express = require('express');
const mongoose = require('mongoose');

//Require utils
const ExpressError = require('./utils/ExpressError.js');

// Used to recieve requests from other servers 
const cors = require('cors');

// Require session
const session = require('express-session');

//Requiring routes
const turfs = require('./routes/turfs.js');
const reviews = require('./routes/reviews.js');
const users = require('./routes/users.js');

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


//Configure Express app & Other Middleware
app.use(express.json());
app.use(cors());
const sessionConfig = {
    secret: 'thisShouldBeABetterSecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,                       //Date.now() is in milliseconds and we add on how long we want it to last (also in milliseconds)
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};
app.use(session(sessionConfig));

//Routing
app.use('/',users);

app.use('/turfs', turfs);

app.use('/turfs/:id/reviews', reviews);

app.get('/error', (req, res, next) => {
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