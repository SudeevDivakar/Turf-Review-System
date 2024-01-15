//Requiring JOI for schema validations
const Joi = require('joi');

//Schema validations for turf
const turfSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.array().items(
        Joi.object({
            url: Joi.string().required(),
            filename: Joi.string().required(),
            originalname: Joi.string().required()
        })
    ).min(1),
    location: Joi.string().required(),
    description: Joi.string().required(),
    latitude: Joi.number().min(-90).max(90).allow(''),
    longitude: Joi.number().min(-180).max(180).allow('')
});

//Schema validations for reviews
const reviewSchema = Joi.object({
    rating: Joi.number().required().min(0).max(5),
    review: Joi.string().required()
});

module.exports = { turfSchema, reviewSchema };