//Import dependencies
const express = require('express');
const mongoose = require('mongoose');

//Require utils
const ExpressError = require('./utils/ExpressError.js');

// Used to recieve requests from other servers 
const cors = require('cors');

// Require Cookie Parser
const cookieParser = require('cookie-parser');

//Requiring routes
const turfs = require('./routes/turfs.js');
const reviews = require('./routes/reviews.js');
const users = require('./routes/users.js');

//Require Environment Variables
if (process.env.NODE_ENV !== 'production') {
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


//Configure Express app & Other Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.cookie('key', 'value', {
        sameSite: 'None',
        secure: true,
    });
    next();
});

//Routing
app.use('/', users);

app.use('/turfs', turfs);

app.use('/turfs/:id/reviews', reviews);

app.get('/error', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
});

app.use((err, req, res, next) => {
    const { message = 'Something Went Wrong', statusCode = 500 } = err;
    res.status(statusCode).send(message);
});


//Start server
app.listen(process.env.PORT, () => {
    console.log('Listening on port 3000');
});