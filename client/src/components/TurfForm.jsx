import React from 'react';
import { TextField, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function TurfForm({ handleSubmit, formData, setFormData, type }) {
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((oldFormData) => {
            return { ...oldFormData, [name]: value };
        });
    };

    return (
        <>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ width: '35rem', display: 'flex', flexDirection: 'column' }}
            >
                <TextField
                    label="Name"
                    variant="outlined"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="&#8377;Price"
                    variant="outlined"
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Rating"
                    variant="outlined"
                    type="number"
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Location"
                    variant="outlined"
                    multiline
                    rows={4}
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Review"
                    variant="outlined"
                    multiline
                    rows={4}
                    id="review"
                    name="review"
                    value={formData.review}
                    onChange={handleChange}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Image URL"
                    variant="outlined"
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    sx={{ marginBottom: 2 }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Button variant="contained" type="submit" color="success" sx={{ width: '40%', marginBottom: 6 }}>
                        {type === 'edit' ? 'Edit' : 'Add'} Turf
                    </Button>
                    <Link to='/turfs'>
                        <Button variant='contained' color='primary'>Back To Turfs</Button>
                    </Link>
                </Box>
            </Box>
        </>
    );
}
