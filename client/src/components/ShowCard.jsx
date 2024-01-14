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
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const color = teal[200];
const hoverColor = teal[300];

export default function ShowCard({ turf, handleDelete, id }) {
    const [isUser, setIsUser] = React.useState(false);
    useEffect(() => {
        async function isLoggedIn() {
            const user = await axios.get('http://localhost:3000/profile', { withCredentials: true });
            if (!user.data) {
                setIsUser(false);
            }
            else if (turf.author && user.data.username === turf.author.username) {
                setIsUser(true);
            }
            else {
                setIsUser(false);
            }
        }
        isLoggedIn();
    }, [turf.author]);

    const NextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: 'block', borderRadius: '50%', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                onClick={onClick}
            />
        );
    };

    const PrevArrow = ({ className, onClick }) => {
        return (
            <div
                className={className}
                style={{
                    display: 'block',
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    zIndex: 1
                }}
                onClick={onClick}
            />
        );
    };
    
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    return (
        <Card className="carousel-card" sx={{ width: '34rem', margin: 'auto', mt: 3, mb: 3 }}>
            {turf.image && turf.image.length > 0 && (
                <Slider {...sliderSettings}>
                    {turf.image.map((img, index) => (
                        <CardMedia
                            key={index}
                            component="img"
                            alt="Turf Photo"
                            height="300"
                            image={img.url}
                        />
                    ))}
                </Slider>
            )}
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
                <Rating name="read-only" value={turf.rating || 0} precision={0.5} readOnly sx={{ mt: 1 }} />
                <Typography variant="body2" sx={{ mt: 2 }} color="text.secondary">
                    Submitted By: <b>{turf.author ? turf.author.username : "Unknown User"}</b>
                </Typography>
            </CardContent>
            {isUser && <CardActions sx={{ justifyContent: 'center', mb: 2 }}>
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