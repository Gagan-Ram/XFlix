const router = require("express").Router()
const {saveVideo} = require("../validators/video.validators")
const validate=require("../middlewares/validate")
const  { videosController }  = require("../controllers/index.controller")

router.get("/", videosController.searchVideo )

router.post("/",validate(saveVideo),videosController.uploadVideos )

router.get("/:id", videosController.getById )

router.patch("/:id", videosController.updateVotes )

module.exports = router