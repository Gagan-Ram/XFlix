import React, { Fragment } from 'react';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import GenrePanel from './GenrePanel';
import { Stack } from '@mui/material';
import FormModal from './FormModal'
import useMediaQuery from '@mui/material/useMediaQuery';

const border = "1px solid white"


const SearchBar = (props) => {
    return (
        <InputBase className={props.classes}
            sx={{
                ml: 1,
                flex: 1,
                width: props.classes === "desktop" ? 700 : "100%",
                bgcolor: "black",
                color: "white",
                border: border,
                borderRadius: 2,
                paddingLeft: 2,
                paddingRight: 2,
            }}
            placeholder="Search"
            value={props.title}
            onChange={props.search}
            endAdornment={<SearchIcon />}
        />
    )
}

export default function Header({ genreState, ratingsState, genreClick, ratingsClick, titleState, setTitleState, sortValue, handleSortChange, setIsLoading }) {

    const searchInputHandler = (event) => {
        setIsLoading(true)
        setTitleState(event.target.value)
    }

    const isSmallScreen = useMediaQuery("(max-width: 900px)");

    // 242424
    return (
        <Stack sx={{ background: "#242323", color: "white", p: 2 }} >
            <Box style={{ display: 'flex', justifyContent: 'space-between' }} sx={{ marginBottom: 2 }} >
                <Box style={{ fontSize:"25px", letterSpacing:"0.049em"}} >
                   <span style={{color:"red"}} >X</span>Flix 
                </Box>
                <Box>
                    {
                        ! isSmallScreen && (
                            <SearchBar title={titleState} search={searchInputHandler} classes="desktop" />
                        )
                    }
                </Box>
                <>
                    <FormModal />
                </>
            </Box>

            <Box >
                {
                    isSmallScreen && (
                        <SearchBar title={titleState} search={searchInputHandler} classes="mobile" />
                    )
                }
            </Box>

            <GenrePanel
                genreState={genreState}
                ratingsState={ratingsState}
                genreClick={genreClick}
                ratingsClick={ratingsClick}
                sortValue={sortValue}
                handleSortChange={handleSortChange}
            />
        </Stack>
    )
}
