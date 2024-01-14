import React from "react";
import { Typography, Button } from "@mui/material";
import { Link } from 'react-router-dom';

const HomeContent = () => {
    return (
        <div style={{ color: 'white', width: '50%', margin: 'auto' }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>TurfReview</Typography>
            <Typography variant="body1" sx={{mt: 2}}>
                Welcome to Turf Review, <br /> Your go-to source for insightful reviews and recommendations on all things turf. From sports fields to landscapes, we've got the inside scoop to help you make informed choices. Step confidently onto the green with TurfReview as your trusted guide!
            </Typography>
            <Link to='/turfs'><Button variant="contained" sx={{
                width: '30%',
                mt: 3, 
                backgroundColor: 'white', 
                color: 'black',
                '&:hover': {
                    backgroundColor: '#808080',
                    color: 'white',
                }
            }}>
                View Turfs
            </Button></Link>
        </div>
    );
}

export default HomeContent;