import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from "react-router-dom";
import SkeletonBody from './SkeletonBody';

export default function Video({ videos, isLoading, setIsLoading }) {

    const color = "black"

    const navigate = useNavigate()

    const videoClicked = (event) => {
        navigate(`/${event.target.id}`)
        window.scrollTo(0, 0); 
    }
    
    // xs, sm, md, lg, and xl
    return (
        // pt: 3, pl:{xs:12,sm:10,md:15},pr:{xs:7,sm:10,md:15},
        < Box sx={{ bgcolor: color }}>
            <Grid container spacing={2} sx={{m:5}} >
                {
                    !isLoading ?

                        videos.map((value, key) => (

                            <Grid item md={4} lg={3} sm={6} xs={12} >
                                <>
                                    <Card sx={{borderRadius: 0 }} style={{ backgroundColor: color }} >
                                        <CardActionArea  >
                                            <CardMedia
                                                component="img"
                                                image={value.previewImage}
                                                alt="green iguana"
                                                id={value._id}
                                                onClick={videoClicked}
                                            />
                                            <CardContent>
                                                <Typography variant="body2" color="text.secondary" textAlign="left" sx={{
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    color: "white"
                                                }} >
                                                    {value.title}
                                                </Typography>
                                                {/* <Typography variant="body2" color="text.secondary" textAlign="left" > */}
                                                    {/* {currentDate()} */}
                                                {/* </Typography> */}
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </>
                            </Grid>

                        ))
                        :
                        (
                            <SkeletonBody />
                        )
                }
                {

                }
            </Grid>
        </ Box >
    )
}
