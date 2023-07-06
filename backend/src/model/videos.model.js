const mongoose = require("mongoose")

const VideoSchema = new mongoose.Schema({

    videoLink: {
        type: String,
        reqired: true
    },

    title: {
        type: String,
        reqired: true
    },

    genre: {
        type: String,
        reqired: true
    },

    contentRating: {
        type: String,
        reqired: true
    },

    releaseDate: {
        type: Date,
        reqired: true,
        format: "DD MMM YYYY"
    },

    previewImage: {
        type: String,
        reqired: true
    },

    votes : {
    	upVotes : {
            type: Number,   
            min : 0
        },
    	downVotes :  {
            type: Number,
            min : 0
        }
    },

    viewCount: {
        type: Number,
        min : 0,
        reqired: true
    },

},
    { timestamps: true }
)

const videosModel = mongoose.model("videos", VideoSchema)

module.exports = videosModel