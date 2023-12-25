const mongoose = require('mongoose');
const Turf = require('../models/turfSchema.js');             //requiring model 
const {footballTurfs} = require('./turfs.js');              //requiring file with seed data

mongoose.connect('mongodb://127.0.0.1:27017/TurfReview')    //connection to mongoDB
.then(() => {
    console.log('DATABASE CONNECTION OPEN');
})
.catch(() => {
    console.log('ERROR IN DATABASE CONNECTION');
});

async function seedDB() {                         //adding each football turf into the DB 
    await Turf.deleteMany({});
    for(let i of footballTurfs){
        const turf = new Turf(i);
        await turf.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})


