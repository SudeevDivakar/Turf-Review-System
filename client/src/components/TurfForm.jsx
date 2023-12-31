import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function TurfForm({ handleSubmit, formData, setFormData, type }) {
    const [errors, setErrors] = useState({});

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((oldFormData) => {
            return { ...oldFormData, [name]: value };
        });

        // Clear the error when the user starts typing
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};

        // Validate each field and set the corresponding error
        if (!formData.name) {
            newErrors.name = 'Name is required';
        }

        if (!formData.price) {
            newErrors.price = 'Price is required';
        }

        if (!formData.rating) {
            newErrors.rating = 'Rating is required';
        }

        if (!formData.location) {
            newErrors.location = 'Location is required';
        }

        if (!formData.review) {
            newErrors.review = 'Review is required';
        }

        if (!formData.image) {
            newErrors.image = 'Image URL is required';
        }

        setErrors(newErrors);

        // Return true if there are no errors, false otherwise
        return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = (evt) => {
        evt.preventDefault();

        if (validateForm()) {
            // Call the provided handleSubmit function only if the form is valid
            handleSubmit(evt);
        }
    };

    return (
        <>
            <Box
                component="form"
                onSubmit={handleFormSubmit}
                sx={{ width: '35rem', display: 'flex', flexDirection: 'column' }}
            >
                <TextField
                    label="Name"
                    variant="outlined"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="&#8377;Price"
                    variant="outlined"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    error={!!errors.price}
                    helperText={errors.price}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Rating"
                    variant="outlined"
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    error={!!errors.rating}
                    helperText={errors.rating}
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
                    error={!!errors.location}
                    helperText={errors.location}
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
                    error={!!errors.review}
                    helperText={errors.review}
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
                    error={!!errors.image}
                    helperText={errors.image}
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
