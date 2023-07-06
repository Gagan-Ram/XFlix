import React, { Fragment, useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import UploadIcon from '@mui/icons-material/Upload';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';

import { FormTextFieldDate } from './FormTextField'
import FormSelect from './FormSelect'
import { Typography } from '@mui/material';
import { config } from '../App';
import axios from 'axios';
import FormTextField from './FormTextField'
import {useSnackbar} from 'notistack'

const style = {
    position: 'absolute',
    // bgcolor : "black",
    // color: "white",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 325,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2
};

export default function FormModal() {
    const [open, setOpen] = useState(false);
    const [videoValue, setVideoValue] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [titleValue, setTitleValue] = useState('')
    const [genre, setGenre] = useState('')
    const [ageFilter, setAgeFilter] = useState('')
    const [platform, setPlatform] = useState('');
    const [dateState, setDateState] = useState('')

    const {enqueueSnackbar}=useSnackbar();

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
    };
    const handleVideoChange = (event) => {
        setVideoValue(event.target.value)
    }
    const handleTitleChange = (event) => {
        setTitleValue(event.target.value)
    }
    const handleGenreChange = (event) => {
        setGenre(event.target.value);
    }
    const handleAgeChange = (event) => {
        setAgeFilter(event.target.value);
    }
    const handleImageChange = (event) => {
        setPreviewImage(event.target.value);
    }
    const handleDateChange = (event) => {
        setDateState(event.target.value);
    }
    const handlePlatformChange = (event) => {
        setPlatform(event.target.value);
    }

    // console.log(`videoLink==> ${videoValue} title==> ${titleValue}  genre==> ${genre}  ageFilter==> ${ageFilter}`)

    let videoLink;
    let title;
    if( platform === 'youtube' ){
        videoLink = `https://www.youtube.com/embed/${videoValue}`
        title = `https://img.youtube.com/vi/${previewImage}/0.jpg`
    }else if (platform === 'vimeo'){
        videoLink = `https://player.vimeo.com/video/${videoValue}`
        title = `https://vumbnail.com//${previewImage}.jpg`
    }

    let body = {
        videoLink: videoLink,
        previewImage: title,
        title: titleValue,
        genre: genre,
        contentRating: ageFilter,
        votes: {
            upVotes: 0,
            downVotes: 0
        },
        releaseDate: dateState,
        viewCount: 0
    }

    const uploadVideoToDatabase = (event) => {
        const api = `${config.endpoint}videos`
        axios.post(api, body)
            .then((res) => {
                enqueueSnackbar("Video uploaded successfully", { variant: "success" })
                // console.log(res.data.videos)
            })
            .catch((err) => {
                // console.log(err.response.data.error[0].message);
                enqueueSnackbar(err.response.data.error[0].message, { variant: "error" })
            })
        }

    const genreArray = [
        "Education",
        "Sports",
        "Stock Market",
        "Vlogs"
    ]

    const ageGroup = [
        "7+",
        "12+",
        "16+",
        "18+"
    ]

    const PlatformArray = [
        "youtube",
        "vimeo"
    ]

    const uploadObject = [
        { title: "Video Id", helperText: "This Link will be used to derive the video" },
        { title: "Thumbnail Image Id", helperText: "This Link will be used to preview the thumbnail image" },
        { title: "Title", helperText: "The title will be the representative text for video" },
        { title: "Genre", helperText: "Genre will help in categorizing your videos" },
        { title: "Suitalble age group for the clip", helperText: "This will be used to filter videos on age group suitability" },
        { title: "Release date", helperText: "This will be used to sort videos" },
        { title:"Select Platfrom", helperText:"Select from which platform you are  this video" }
    ]

    console.log(platform);
    return (
        <>
            <Button variant="contained" sx={{ textTransform: "capitalize" }} startIcon={<UploadIcon />} size="medium" onClick={handleOpen} >Upload</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }} >
                        <Typography variant="h6" gutterBottom>
                            Upload Video
                        </Typography>
                        <Button startIcon={<CloseIcon />} size="large" sx={{ color: "black" }} onClick={handleClose} ></Button>
                    </Box>

                    <FormSelect state={platform} inputHandler={handlePlatformChange} filterArray={PlatformArray} filterValues={uploadObject} index={6} />

                    <FormTextField state={videoValue} inputHandler={handleVideoChange} filterValues={uploadObject} index={0} />

                    <FormTextField state={previewImage} inputHandler={handleImageChange} filterValues={uploadObject} index={1} />

                    <FormTextField state={titleValue} inputHandler={handleTitleChange} filterValues={uploadObject} index={2} />

                    <FormSelect state={genre} inputHandler={handleGenreChange} filterArray={genreArray} filterValues={uploadObject} index={3} />

                    <FormSelect state={ageFilter} inputHandler={handleAgeChange} filterArray={ageGroup} filterValues={uploadObject} index={4} />


                    <FormTextFieldDate state={dateState} inputHandler={handleDateChange} filterValues={uploadObject} index={5} date={true} />

                    <Box sx={{ display: "flex" }} >
                        <Button variant='contained' color="warning" onClick={uploadVideoToDatabase} >
                                Upload Video
                        </Button>
                        <Button variant="text" size="medium" sx={{ color: "black" }} onClick={handleClose}  > Cancel </Button>
                    </Box>
                </Box>

            </Modal>
        </>
    );
}
