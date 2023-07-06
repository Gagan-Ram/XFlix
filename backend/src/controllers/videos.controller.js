const Joi = require('joi');

const { videosService } = require("../services/videos.service")



const uploadVideos = async (req, res) => {
    // console.log('1')
    const video = req.body
    // console.log(video)

    try {
        const videoInserted = await videosService.insert(video)
        res.json(videoInserted)

    } catch (error) {
        res.status(500).json({
            message: "Couldn't upload videos",
            error
        })
    }

}

const searchVideo = async (req, res) => {
    const query = req.query
    // console.log('1')

    try {
        const result = await videosService.searchByFilters(query)
        res.json({
            "videos": result
        })

    } catch (error) {
        res.status(500).json({
            message: "Couldn't find videos",
            error,
        })
    }


}

const updateVotes = async (req, res) => {

    const body = req.body
    // console.log(body);

    try {
        const result = await videosService.changeVotes(body)
        res.json(result)

    } catch (error) {
        res.status(500).json({
            message: "Couldn't find videos",
            error,
        })

    }
}

const getById = async (req, res) => {
    const id = req.params.id
    try {

        const result = await videosService.searchVideo(id)
        res.json(result)

    } catch (error) {
        res.status(500).json({
            message: "Couldn't find videos",
            error,
        })

    }
}


module.exports = {
    uploadVideos,
    searchVideo,
    updateVotes,
    getById
}