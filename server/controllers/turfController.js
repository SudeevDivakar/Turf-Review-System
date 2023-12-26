const Turf = require('../models/turfSchema.js');

const displayAllTurfs = async (req, res) => {
    const turfs = await Turf.find({});
    res.json(turfs);
};

const addTurf = async (req, res) => {
    const turf = await Turf.create({
        name: req.body.name,
        price: req.body.price,
        rating: req.body.rating,
        review: req.body.review,
        location: req.body.location
    });
    res.json(turf);
};

const displayTurf = async (req, res) => {
    const turf = await Turf.findById(req.params.id);
    res.json(turf);
};

const updateTurf = async (req, res) => {
    const newTurf = await Turf.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
    res.json({ newTurf });
};

const deleteTurf =async (req, res) => {
    const response = await Turf.deleteOne({ _id: req.params.id });
    res.json(response);
};

module.exports = {
    displayAllTurfs,
    addTurf,
    displayTurf,
    updateTurf,
    deleteTurf
};
