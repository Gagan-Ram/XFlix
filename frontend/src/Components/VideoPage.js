import Button from '@mui/material/Button'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { config } from '../App'
import axios from 'axios'
import { Box, Typography } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Video from './Video'
import { useSnackbar } from 'notistack';
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
import { useMediaQuery } from '@mui/material';

export default function VideoPage({ locationPath, setLocationPath }) {
    const { enqueueSnackbar } = useSnackbar();

    const extraSmallScreen = useMediaQuery('(max-width: 390px)');
    const smallScreen = useMediaQuery('(max-width: 600px)');
    const mediumScreen = useMediaQuery('(max-width: 960px)');

    const [videoWithId, setVideoWithId] = useState([])
    const [videos, setVideos] = useState([])
    const [votesArray, setVotesArray] = useState([])

    const videoSrc = videoWithId.videoLink

    const location = useLocation()

    setLocationPath(location.pathname)

    const votesUpdateApi = `${config.endpoint}videos/${videoWithId._id}`
    // console.log(votesUpdateApi);

    let body = {
        _id: videoWithId._id
    }

    const upVotesHandler = (event) => {

        if (votesArray.includes(event.target.value)) {      // if upVotes already present in an votesArray
            const index = votesArray.indexOf(event.target.value)
            votesArray.splice(index, 1)
            setVotesArray([...votesArray])
            body.upVotes = -1
        }
        else {
            if (votesArray.includes("downVotes")) {        // if downVoted then remove it from votesArray and decrement the downVotes
                const index = votesArray.indexOf("downVotes")
                votesArray.splice(index, 1)
                body.downVotes = -1
            }
            body.upVotes = 1
            setVotesArray([...votesArray, event.target.value])
        }

        axios.patch(votesUpdateApi, body)
            .then((res) => {
                // console.log(res.data.votes);
            })
            .catch((err) => {
                enqueueSnackbar("Couldn't able to patch, please check your internet connection", { variant: "error" })
            })

    }

    const downVotesHandler = (event) => {
        if (votesArray.includes(event.target.value)) {      // if downVotes already present in an votesArray
            const index = votesArray.indexOf(event.target.value)
            votesArray.splice(index, 1)
            setVotesArray([...votesArray])
            body.downVotes = -1
        }
        else {
            if (votesArray.includes("upVotes")) {        // if upVoted then remove it from votesArray and decrement the upVotes
                const index = votesArray.indexOf("upVotes")
                votesArray.splice(index, 1)
                body.upVotes = -1
            }
            body.downVotes = 1
            setVotesArray([...votesArray, event.target.value])
        }

        axios.patch(votesUpdateApi, body)
            .then((res) => {
                // console.log(res.data.votes);
            })
            .catch((err) => {
                enqueueSnackbar("Couldn't able to patch, please check your internet connection", { variant: "error" })
            })

    }


    function getVideoById() {
        const videoApi = `${config.endpoint}videos${location.pathname}`

        axios.get(videoApi)
            .then((res) => {
                setVideoWithId(res.data)
            })
            .catch((err) => {
                console.log(err)
                enqueueSnackbar("Please check your Internet Connection", { variant: "error" })
            })

    }
    // console.log(videoWithId);


    function getAllVideos() {
        const api = `${config.endpoint}videos`
        axios.get(api)
            .then((res) => {
                setVideos(res.data.videos)
            })
            .catch((err) => {
                enqueueSnackbar("The Backend is not working, please try again later", { variant: "error" })
            })
    }

    useEffect(() => {
        getVideoById();
        getAllVideos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locationPath])

    const mainVideoisClicked = () => {
        // console.log("mainVideoisClicked1234567890-")

    }

    return (

        <Box style={{ padding: "5%", backgroundColor: "black", color: "white" }}>
            {
                videoWithId && (
                    <Box sx={{ borderRadius: 12 }} >

                        <Box elevation={3} sx={{ mb: 3, position: 'relative', overflow: 'hidden', width: '100%' }} onClick={{ mainVideoisClicked }} >
                            {
                                extraSmallScreen ?
                                    <iframe title={videoWithId.title}
                                        style={{ "width": "100%", objectFit: "contain", borderRadius: "10px", "height": '10rem' }}
                                        src={videoSrc}
                                        onClick={{ mainVideoisClicked }}
                                    /> :
                                    smallScreen ?
                                        <iframe title={videoWithId.title}
                                            style={{ "width": "100%", objectFit: "contain", borderRadius: "10px", "height": '15rem' }}
                                            src={videoSrc}
                                            onClick={{ mainVideoisClicked }}
                                        /> :
                                        mediumScreen ?
                                            <iframe title={videoWithId.title}
                                                style={{ "width": "100%", objectFit: "contain", borderRadius: "10px", "height": '25rem' }}
                                                src={videoSrc}
                                                onClick={{ mainVideoisClicked }}
                                            /> :
                                            <iframe title={videoWithId.title}
                                                style={{ "width": "100%", objectFit: "contain", borderRadius: "10px", "height": '35rem' }}
                                                src={videoSrc}
                                                onClick={{ mainVideoisClicked }}
                                            />
                            }
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "space-between", sm: { color: "blue" } }} >
                            <Box>
                                <Typography variant="body2" textAlign="left"  >
                                    {videoWithId.title}
                                </Typography>
                                <Typography variant="caption" textAlign="left" >
                                    {videoWithId.contentRating} {videoWithId.viewCount} views
                                </Typography>
                            </Box>
                            <Box>

                                {
                                    videoWithId.votes && (
                                        <Box sx={{display:'flex', justifyContent:'left'}} >
                                            <Button
                                                sx={{ color: "white", textTransform: "capitalize", ml: 1, borderRadius: 15 }}
                                                variant={votesArray.includes("upVotes") ? "contained" : "outlined"}
                                                color='secondary'
                                                startIcon={<ThumbUpIcon onClick={upVotesHandler} />}
                                                value="upVotes"
                                                onClick={upVotesHandler}
                                            >
                                                {votesArray.includes("upVotes") ? videoWithId.votes.upVotes + 1 : videoWithId.votes.upVotes}
                                            </Button>

                                            <Button
                                                sx={{ color: "white", textTransform: "capitalize", ml: 1, borderRadius: 15 }}
                                                variant={votesArray.includes("downVotes") ? "contained" : "outlined"}
                                                color='secondary'
                                                startIcon={<ThumbDownIcon />}
                                                value="downVotes"
                                                onClick={downVotesHandler}
                                            >
                                                {votesArray.includes("downVotes") ? videoWithId.votes.downVotes + 1 : videoWithId.votes.downVotes}
                                            </Button>
                                        </Box>
                                    )
                                }
                            </Box>
                        </Box>
                    </Box>
                )
            }
            <hr />
            <Video videos={videos} />
        </Box >
    )
}