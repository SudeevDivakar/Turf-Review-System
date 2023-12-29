import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { teal } from '@mui/material/colors';

const color = teal[200];
const hoverColor = teal[300];

export default function ShowCard({ turf, handleDelete, id }) {
    return (
        <Card sx={{ width: 500, margin: 'auto' }}>
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
                    {turf.review}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                    {turf.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Price: &#8377;{turf.price}/hour
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
                <Link to={`/turfs/edit/${id}`}><Button size="small" variant='contained' sx={{
                    backgroundColor: color, '&:hover': {
                        backgroundColor: hoverColor
                    }
                }}>Edit Turf</Button></Link>
                <Button size="small" variant='contained' onClick={handleDelete} color='error'>Delete Turf</Button>
                <Link to='/turfs'><Button size="small" variant='contained' color='primary'>Back To Turfs</Button></Link>
            </CardActions>
        </Card>
    );
}