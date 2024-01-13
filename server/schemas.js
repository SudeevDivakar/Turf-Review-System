const Joi = require('joi');

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
    description: Joi.string().required()
});

const reviewSchema = Joi.object({
    rating: Joi.number().required().min(0).max(5),
    review: Joi.string().required()
})

module.exports = { turfSchema, reviewSchema };