const mongoose = require('mongoose');
const Review = require('../models/reviewSchema.js');
const Turf = require('../models/turfSchema.js');             //requiring models
const {footballTurfs} = require('./turfs.js');              //requiring file with seed data
require('dotenv').config({ path: '../.env' });

if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

mongoose.connect(process.env.DB_URL)    //connection to mongoDB
.then(() => {
    console.log('DATABASE CONNECTION OPEN');
})
.catch(() => {
    console.log('ERROR IN DATABASE CONNECTION');
});

async function seedDB() {                         //adding each football turf into the DB 
    await Turf.deleteMany({});
    await Review.deleteMany({});
    for(let i of footballTurfs){
        const turf = new Turf(i);
        await turf.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})


