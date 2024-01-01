const Joi = require('joi');

const turfSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.string().required(),
    rating: Joi.number().required().max(5).min(0),
    location: Joi.string().required(),
    description: Joi.string().required()
});

module.exports = { turfSchema };