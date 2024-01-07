const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

userSchema.plugin(passportLocalMongoose);       //This will add onto our schema a username(also makes sure it's unique), password and some additional methods

module.exports = mongoose.model('User', userSchema);