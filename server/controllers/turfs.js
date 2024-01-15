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

//Controller to get all turf data
const getAllTurfs = async (req, res) => {
    const turfs = await Turf.find({});
    res.json(turfs);
};

//Controller to add a turf
const addTurf = async (req, res) => {
    const { token } = req.cookies;
    let username;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            username = user.username;
        })
    }

    try {
        const encodedAddress = encodeURIComponent(req.body.location);
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1`);    //Find geoCodes for the given address
        const user = await User.findOne({ username });
        const turf = await Turf.create({
            name: req.body.name,
            image: req.files.map(f => ({ url: f.path, filename: f.filename, originalname: f.originalname })),
            price: req.body.price,
            latitude: response.data && response.data.length > 0 && response.data !== undefined ? parseFloat(response.data[0].lat) : '',
            longitude: response.data && response.data.length > 0 && response.data !== undefined ? parseFloat(response.data[0].lon) : '',
            description: req.body.description,
            location: req.body.location,
            author: user
        });
        return res.json({ Error: false, turf });
    }
    catch(err) {
        res.json({ Error: true, message: 'Cannot extract Geo keys' });
    }
};

//Controller to get information for a single turf
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

//Controller to update a turf's information 
const updateTurf = async (req, res) => {
    const { id } = req.params;
    const turf = await Turf.findById(id);

    //Conditions for coordinates
    const newValuesWithPreviousValues = (turf.latitude && turf.longitude && (turf.latitude !== parseFloat(req.body.latitude) || parseFloat(turf.longitude !== req.body.longitude)));  //Condition for when new values of latitude and longitude are passed with already existing values of lat and long in the database 
    const emptyValuesWithPreviousValues = (req.body.latitude === '' && req.body.longitude === '' && turf.latitude && turf.longitude);    //Condition for when new values of latitude and longitude are not passed with already existing values of lat and long in the database
    const newValuesWithNoPreviousValues = (turf.latitude === null && turf.longitude === null && (req.body.latitude !== '' && req.body.longitude !== ''));     //Condition for when new values of latitude and longitude are passed with no pre-existing values of lat and long in the database

    const emptyValuesWithNoPreviousValues = (turf.latitude === null && turf.longitude === null && (req.body.latitude === '' && req.body.longitude === ''));     //Condition for when no new values of latitude and longitude are passed with no pre-existing values of lat and long in the database
    const sameValuesAsPreviousValues = (turf.latitude && turf.longitude && (turf.latitude === parseFloat(req.body.latitude) || parseFloat(turf.longitude === req.body.longitude)));    //Values of lat and long remain unchanged

    const addressIsChangeWithPreviousValues = (turf.location !== req.body.location && sameValuesAsPreviousValues);    //Adress is changed with pre-existing values in the database
    const addressNotChangeWithPreviousValues = (turf.location === req.body.location && sameValuesAsPreviousValues);    //Adress is not changed with pre-existing values in the database

    if (newValuesWithPreviousValues || newValuesWithNoPreviousValues || emptyValuesWithPreviousValues) {    //Update values of latitude and longitude in DB without caring about the location information sent
        try {
            const newTurf = await Turf.findByIdAndUpdate(id, {
                name: req.body.name,
                price: req.body.price,
                latitude: emptyValuesWithPreviousValues ? '' : parseFloat(req.body.latitude),
                longitude: emptyValuesWithPreviousValues ? '' : parseFloat(req.body.longitude),
                location: req.body.location,
                description: req.body.description,
            }, { new: true });
            const imgs = req.files.map(f => ({ url: f.path, filename: f.filename, originalname: f.originalname }));
            newTurf.image.push(...imgs);
            await newTurf.save();
            return res.json({ Error: false, newTurf });
        }
        catch(err) {
            return res.json({ Error: true });
        }
    }
    else if (emptyValuesWithNoPreviousValues) {            //Add latitude and longitude values based on the location passed
        try {
            const encodedAddress = encodeURIComponent(req.body.location);
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1`);

            const newTurf = await Turf.findByIdAndUpdate(id, {
                name: req.body.name,
                price: req.body.price,
                latitude: response.data && response.data.length > 0 && response.data !== undefined ? parseFloat(response.data[0].lat) : '',
                longitude: response.data && response.data.length > 0 && response.data !== undefined ? parseFloat(response.data[0].lon) : '',
                location: req.body.location,
                description: req.body.description,
            }, { new: true });
            const imgs = req.files.map(f => ({ url: f.path, filename: f.filename, originalname: f.originalname }));
            newTurf.image.push(...imgs);
            await newTurf.save();
            return res.json({ Error: false, newTurf });
        }
        catch(err){
            return res.json({ Error: true });
        }
    }
    else if( addressNotChangeWithPreviousValues || addressIsChangeWithPreviousValues ){       //Retain previous values of latitude and longitude and update the location field in DB
        try{
            const newTurf = await Turf.findByIdAndUpdate(id, {
                name: req.body.name,
                price: req.body.price,
                latitude: parseFloat(turf.latitude),
                longitude: parseFloat(turf.longitude),
                location: req.body.location,
                description: req.body.description,
            }, { new: true });
            const imgs = req.files.map(f => ({ url: f.path, filename: f.filename, originalname: f.originalname }));
            newTurf.image.push(...imgs);
            await newTurf.save();
            return res.json({ Error: false, newTurf });
        }
        catch(err){
            return res.json({ Error: true });
        }
    }
    else{
        return res.json({ Error: true });
    }
};

//Controller to delete a turf
const deleteTurf = async (req, res) => {
    const { id } = req.params;
    const images = await Turf.findById(id);
    for (let i of images.image) {
        await cloudinary.uploader.destroy(i.filename);      //Remove all images from cloudinary whenever a turf is deleted
    }
    const response = await Turf.findByIdAndDelete(id);
    res.json(response);
};

//Controller to delete selected images from cloudinary and update values in DB
const deleteImage = async (req, res) => {
    try {
        for (let filename of req.body.imagesToDelete) {
            await cloudinary.uploader.destroy(filename);      //Delete selected images from cloudinary
        }
        const { id } = req.params;
        const turf = await Turf.findById(id);
        await turf.updateOne({ $pull: { image: { filename: { $in: req.body.imagesToDelete } } } });     //Update file values in DB
        return res.json({ message: 'Images Deleted Successfully', Error: false });
    }
    catch {
        res.json({ Error: true, message: 'Images not Deleted' });
    }
}

//Controller to find coordinates and other data about turfs
const getAllMapData = async (req, res) => {
    const result = await Turf.find({}, { name: 1, location: 1, latitude: 1, longitude: 1, rating: 1, _id: 1 });
    res.json(result);
}

module.exports = { getAllTurfs, addTurf, getTurf, updateTurf, deleteTurf, deleteImage, getAllMapData };