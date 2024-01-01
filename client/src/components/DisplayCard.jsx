import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, Typography, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

export default function DisplayCard({ turf }) {
    const theme = useTheme();

    return (
        <Card sx={{ display: 'flex', width: '50rem', justifyContent: 'center', margin: 'auto', marginBottom: 2, boxShadow: 3 }}>
            <CardMedia
                component="img"
                sx={{ width: 300, height: 300, objectFit: 'cover' }}
                image={turf.image}
                alt={`${turf.name} photo`}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <CardContent sx={{ flex: '1 0 auto', textAlign: 'left' }}>
                    <Typography component="div" variant="h4" sx={{ marginBottom: 1 }}>
                        {turf.name}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ marginBottom: 1 }}>
                        {turf.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="div">
                        Location: {turf.location}
                    </Typography>
                    <Rating name="read-only" value={turf.rating} precision={0.5} readOnly sx={{mt: 2}}/>
                    <div>
                        <Link to={`/turfs/${turf._id}`}>
                            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                                View Turf
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Box>
        </Card>
    );
}
