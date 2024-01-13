const jwt = require('jsonwebtoken');

//Requiring models
const User = require('../models/userSchema.js');
const Turf = require('../models/turfSchema.js');

//Require cloudinary configuration to remove images on cloudinary
const { cloudinary } = require('../cloudinary');

//Require axios
const axios = require('axios');

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

    const encodedAddress = encodeURIComponent(req.body.location);
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1`);

    const user = await User.findOne({ username });
    const turf = await Turf.create({
        name: req.body.name,
        image: req.files.map(f => ({ url: f.path, filename: f.filename, originalname: f.originalname })),
        price: req.body.price,
        geoCode: response.data && response.data.length > 0 && response.data !== undefined ? [parseFloat(response.data[0].lat), parseFloat(response.data[0].lon)] : null,
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
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename, originalname: f.originalname }));
    newTurf.image.push(...imgs);
    await newTurf.save();
    res.json({ Error: false, newTurf });
};

const deleteTurf = async (req, res) => {
    const { id } = req.params;
    const images = await Turf.findById(id);
    for (let i of images.image) {
        await cloudinary.uploader.destroy(i.filename);
    }
    const response = await Turf.findByIdAndDelete(id);
    res.json(response);
};

const deleteImage = async (req, res) => {
    try {
        for (let filename of req.body.imagesToDelete) {
            await cloudinary.uploader.destroy(filename);
        }
        const { id } = req.params;
        const turf = await Turf.findById(id);
        await turf.updateOne({ $pull: { image: { filename: { $in: req.body.imagesToDelete } } } });
        return res.json({ message: 'Images Deleted Successfully', Error: false });
    }
    catch {
        res.json({ Error: true, message: 'Images not Deleted' });
    }
}

const getAllMapData = async (req, res) => {
    const result = await Turf.find({}, { name: 1, location: 1, geoCode: 1, rating: 1, _id: 0 });
    res.json(result);
}

module.exports = { getAllTurfs, addTurf, getTurf, updateTurf, deleteTurf, deleteImage, getAllMapData };