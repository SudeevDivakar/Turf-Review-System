//Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const Turf = require('./models/turfSchema.js');
const turfController = require('./controllers/turfController.js');
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


//Routing
app.get('/turfs', turfController.displayAllTurfs);

app.post('/turfs/new', turfController.addTurf);

app.get('/turfs/:id', turfController.displayTurf);

app.patch('/turfs/:id', turfController.updateTurf);

app.delete('/turfs/:id', turfController.deleteTurf);


//Start server
app.listen(process.env.PORT, () => {
    console.log('Listening on port 3000');
})