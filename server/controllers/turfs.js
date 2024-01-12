const jwt = require('jsonwebtoken');

//Requiring models
const User = require('../models/userSchema.js');
const Turf = require('../models/turfSchema.js');

//Requiring .env file
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const getAllTurfs = async (req, res) => {
    const turfs = await Turf.find({});
    res.json(turfs);
};

const addTurf = async (req, res) => {
    const { token } = req.cookies;
    let username;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            username = user.username;
        })
    }
    const user = await User.findOne({ username });
    const turf = await Turf.create({
        name: req.body.name,
        image: req.files.map(f => ({ url: f.path, filename: f.filename, originalname: f.originalname })),
        price: req.body.price,
        description: req.body.description,
        location: req.body.location,
        author: user
    });
    res.json(turf);
};

const getTurf = async (req, res) => {
    const turf = await Turf.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author',
            select: 'username'
        }
    }).populate('author');
    res.json(turf);
};

const updateTurf = async (req, res) => {
    const newTurf = await Turf.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        price: req.body.price,
        location: req.body.location,
        description: req.body.description,
    }, { new: true });
    // newTurf.image = newTurf.image.filter((img) => {
    //     if(img in req.body.images){
    //         return img;
    //     }
    // })
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename, originalname: f.originalname }));
    newTurf.image.push(...imgs);
    await newTurf.save();
    res.json({ Error: false, newTurf });
};

const deleteTurf = async (req, res) => {
    const response = await Turf.findByIdAndDelete(req.params.id);
    res.json(response);
};

module.exports = { getAllTurfs, addTurf, getTurf, updateTurf, deleteTurf };