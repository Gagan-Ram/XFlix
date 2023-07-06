import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ImportExportIcon from '@mui/icons-material/ImportExport';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function GenrePanel({ genreState, genreClick, ratingsClick, ratingsState, sortValue, handleSortChange }) {

    const genre = [
        "All Genre",
        "Education",
        "Sports",
        "Stock Market",
        "Vlogs"
    ]

    const ratings = [
        "Any age group",
        "7+",
        "12+",
        "16+",
        "18+"
    ]

    return (
        <>
            <Box>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2, mt: 1, marginBottom: 3, flexWrap: "wrap" }} >

                    <Box sx={{ display: "flex", justifyContent: "center", mb: 2, mt: 1, marginBottom: 3 }} >
                        {
                            genre.map((genreValue, key) => (
                                <Button
                                    sx={{
                                        color: "white", textTransform: "capitalize", ml: 1, borderRadius: 15, fontSize: { xs: "0.7rem", md: "1rem", lg: "1rem" },
                                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100em'
                                    }}
                                    variant={genreState.includes(genreValue) ? "contained" : "text"}
                                    color='secondary'
                                    value={genreValue}
                                    onClick={genreClick}
                                >
                                    {genreValue}
                                </Button>

                            ))
                        }
                    </Box>
                    <>

                        <Button
                            sx={{ color: "white", textTransform: "capitalize", ml: 3, borderRadius: 15, left: "5%", height: 40, fontSize: { xs: "0.7rem", md: "1rem", lg: "1rem" } }}
                            variant="contained"
                            size="medium"
                            startIcon={<ImportExportIcon />}
                        >
                            Sort By:
                            <FormControl sx={{ m: 1, minWidth: 120, width: 2, fontSize: { xs: "0.7rem", md: "1rem", lg: "1rem" } }} size="small" >
                                <Select
                                    id="demo-simple-select-standard"
                                    value={sortValue}
                                    onChange={handleSortChange}
                                >
                                    <MenuItem value={"releaseDate"}>Uploaded Date</MenuItem>
                                    <MenuItem value={"viewCount"}>View Count</MenuItem>
                                </Select>
                            </FormControl>
                        </Button>
                    </>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }} >
                    {
                        ratings.map((ratingsValue, key) => (
                            <Button
                                sx={{
                                    color: "white", textTransform: "capitalize",
                                    ml: { xs: 1, md: 3, lg: 3 }, borderRadius: 15,
                                    fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem", lg: "1rem" },
                                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100em'
                                }}
                                variant={ratingsState.includes(ratingsValue) ? "contained" : "text"}
                                color='secondary'
                                size="medium"
                                value={ratingsValue}
                                onClick={ratingsClick}
                                noWrap
                            >
                                {ratingsValue}
                            </Button>
                        ))
                    }
                </Box>
            </Box>
        </>
    )
}
