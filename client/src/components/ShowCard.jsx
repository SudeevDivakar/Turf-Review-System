import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Typography, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import { teal } from '@mui/material/colors';
import axios from 'axios';

const color = teal[200];
const hoverColor = teal[300];

export default function ShowCard({ turf, handleDelete, id }) {
    const [isUser, setIsUser] = React.useState(false);
    useEffect(() => {
        async function isLoggedIn() {
            const user = await axios.get('http://localhost:3000/profile', {withCredentials: true}); 
            if(!user.data){
                setIsUser(false);
            }
            else if(turf.author && user.data.username === turf.author.username){
                setIsUser(true);
            }
            else{
                setIsUser(false);
            }
        }
        isLoggedIn();
    })

    return (
        <Card sx={{ width: '34rem', margin: 'auto', mt: 3 }}>
            <CardMedia
                sx={{ height: 300 }}
                image={`${turf.image}`}
                title="Turf Photo"
            />
            <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                    {turf.name}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    {turf.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                    Location: <b>{turf.location}</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Price: <b>&#8377;{turf.price}/hour</b>
                </Typography>
                <Rating name="read-only" value={turf.rating || 0} precision={0.5} readOnly sx={{mt: 1}}/>
                <Typography variant="body2" sx={{mt:2}} color="text.secondary">
                    Submitted By: <b>{turf.author ? turf.author.username : "Unknown User"}</b>
                </Typography>
            </CardContent>
            {isUser && <CardActions sx={{ justifyContent: 'center',mb:2 }}>
                <Link to={`/turfs/edit/${id}`}><Button size="small" variant='contained' sx={{
                    backgroundColor: color, '&:hover': {
                        backgroundColor: hoverColor
                    }
                }}>Edit Turf</Button></Link>
                <Button size="small" variant='contained' onClick={handleDelete} color='error'>Delete Turf</Button>
                <Link to='/turfs'><Button size="small" variant='contained' color='primary'>Back To Turfs</Button></Link>
            </CardActions>}
        </Card>
    );
}