const { Videos } = require("../model/index.model")

function contentFunction(contentRating) {
    const ratings = ["Any age group", "7+", "12+", "16+", "18+"]

    const index = ratings.indexOf(contentRating)
    const contentFilter = ratings.splice(index)

    ratingObjectArray = []
    contentFilter.forEach((value, index) => {
        ratingObjectArray.push(value)
    })

    return { $in: ratingObjectArray }
}

const insert = async (video) => {
    try {
        const insertVideo = new Videos(video)

        const insertDocument = await insertVideo.save(insertVideo)

        return insertDocument


    } catch (error) {
        throw new Error("Couldn't  upload videos into database");
    }
}

const searchByFilters = async (query) => {

    const { title, genre, contentRating, sortBy } = query
    // console.log(title);
    // console.log(genre);

    const filters = {}

    if (title) {

        filters.title = {
            $regex: title,
            $options: 'i'
        }

    }

    if (genre && genre !== "All Genre") {

        const genresFilter = genre.split(",")

        const genres = []
        genresFilter.forEach((value, index) => {
            genres.push(value)
        })

        if (contentRating && contentRating !== "Any age group") {

            const returnedValue = contentFunction(contentRating)

            filters.$and = [
                { contentRating: returnedValue },
                { genre: { $in: genres } }
            ]

        }
        else {
            filters.genre = {
                $in: genres
            }
        }
    }


    if (contentRating && contentRating !== "Any age group") {

        const returnedValue = contentFunction(contentRating)

        filters.contentRating = returnedValue

    }

    let sortQuery = {}

    if (sortBy === "viewCount") {
        sortQuery.viewCount = -1;
    }
    else {
        sortQuery.releaseDate = -1;
    }

    // console.log(filters);

    try {

        const video = await Videos.find(filters).sort(sortQuery)
        // console.log(video)
        return video

    } catch (error) {
        throw new Error("Couldn't  find videos into database");
    }
}


const changeVotes = async (body) => {

    // console.log(body);
    const { _id, upVotes, downVotes } = body

    try {
        const filter = { _id: _id }
        let updateObject
        if (upVotes || downVotes) {
            if (upVotes && downVotes)   // if user 1st likes and then dislikes we need to update both
                updateObject = {
                    $inc: {
                        "votes.upVotes": upVotes,
                        "votes.downVotes": downVotes
                    }
                }


            else if (upVotes) {
                updateObject = { $inc: { "votes.upVotes": upVotes } }
            }
            else if (downVotes) {
                updateObject = { $inc: { "votes.downVotes": downVotes } }
            }
        }
        // console.log(updateObject);
        const viewsUpdated = await Videos.findOneAndUpdate(filter, updateObject, { new: true })
        return viewsUpdated

    } catch (error) {
        throw new Error("Couldn't update Votes in database")
    }

}

const searchVideo = async (id) => {

    try {
        const filter = { _id: id }

        const findvideo = await Videos.findById(filter)
        return findvideo

    } catch (error) {
        throw new Error("Couldn't search video from database")
    }

}

module.exports = {

    videosService: {
        insert,
        searchByFilters,
        changeVotes,
        searchVideo
    }

}