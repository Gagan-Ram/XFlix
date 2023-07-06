const Joi = require("joi");


const saveVideo = Joi.object().keys({

    videoLink: Joi.string().required(),

    previewImage: Joi.string().required(),

    title: Joi.string().min(3).max(50).required(),

    genre: Joi.string().valid('Education', 'Sports', 'Stock Market', 'Vlogs').required(),

    contentRating: Joi.string().required().valid('7+', '12+', '16+', '18+').required(),

    votes: {
        upVotes: Joi.number().min(0),
        downVotes: Joi.number().min(0)
    },

    releaseDate: Joi.date().required(),

    viewCount: Joi.number()

})

module.exports = {
    saveVideo
}

