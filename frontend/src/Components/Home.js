import React, { useEffect, useState } from 'react'
import axios from "axios";
import Header from './Header'
import Video from './Video'
import { config } from '../App'
import { Box } from '@mui/material';
import { useSnackbar } from 'notistack'

export default function Home() {
    const { enqueueSnackbar } = useSnackbar();

    const [videos, setVideos] = useState([])
    const [genreState, setGenreState] = useState(["All Genre"])
    const [ratingsState, setRatingsState] = useState("Any age group")
    const [titleState, setTitleState] = useState(null)

    const [isLoading, setIsLoading] = useState(true)

    const [sortValue, setSortValue] = useState("releaseDate");

    const handleSortChange = (event) => {
        setIsLoading(true)
        setSortValue(event.target.value);
    };

    const [timerID, setTimerId] = useState('')

    const genreClick = (event) => {
        if (event.target.value !== "All Genre") {
            const index = genreState.indexOf("All Genre")
            if (index !== -1) {
                genreState.splice(index, 1);
                setGenreState([...genreState]);
            }
        }

        setIsLoading(true)

        if (genreState.includes(event.target.value)) {
            const index = genreState.indexOf(event.target.value)
            if (index !== -1) {
                genreState.splice(index, 1);
                setGenreState([...genreState])  // comment this and use genreFilters in UI u'll notice the difference
            }
        }
        else {
            setGenreState([...genreState, event.target.value])        // push elements to genreState {state}
        }
    }


    const ratingsClick = (event) => {
        setIsLoading(true)
        setRatingsState(event.target.value)
    }

    function getVideos() {
        const api = `${config.endpoint}videos`;
        const params = {};

        if (titleState) {
            params.title = titleState;
        }

        if (genreState.length !== 0) {
            params.genre = genreState;
        }

        if (ratingsState) {
            if (ratingsState === "Any age group") {
                params.contentRating = ratingsState;
            } else {
                const ratingStateValue = ratingsState.split("+")[0];
                params.contentRating = `${ratingStateValue}+`;
            }
        }

        const queryString = Object.entries(params)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join("&");

        const apiKey = queryString ?
            `${api}?${queryString}&sortBy=${sortValue}` :
            `${api}?sortBy=${sortValue}`;

        axios.get(apiKey)
            .then((res) => {
                setVideos(res.data.videos);
            })
            .catch((err) => {
                enqueueSnackbar("The Backend server is not working/on, please try again later", { variant: "error" })
            })

    }

    useEffect(() => {

        timerID && clearTimeout(timerID)

        const newTimerID = setTimeout(() => {
            getVideos();
            setIsLoading(!isLoading)
        }, 2000);

        setTimerId(newTimerID)

        return function () {
            clearTimeout(timerID)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [genreState, ratingsState, titleState, sortValue])


    return (

        <Box sx={{ background: "black", width: '100%', height: '100vh' }} >

            <header>
                <Header
                    genreState={genreState}
                    ratingsState={ratingsState}
                    genreClick={genreClick}
                    ratingsClick={ratingsClick}
                    titleState={titleState}
                    setTitleState={setTitleState}
                    sortValue={sortValue}
                    handleSortChange={handleSortChange}
                    setIsLoading={setIsLoading}
                />
            </header>

            <main >
                <Video
                    videos={videos}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
            </main>

        </Box>
    )
}
