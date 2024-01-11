import { useState } from 'react';
import { TextField, Button, Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';


export default function TurfForm({ handleSubmit, formData, setFormData, type, loading }) {
    const [errors, setErrors] = useState({});

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((oldFormData) => {
            return { ...oldFormData, [name]: value };
        });

        // Clear the error when the user starts typing
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const handleImageDelete = (imageToDelete) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            image: prevFormData.image.filter((image) => image !== imageToDelete),
        }));
    };

    const handleImageChange = (evt) => {
        if (evt.target.files[0] !== undefined) {
            setFormData((oldData) => {
                oldData.image.push(evt.target.files[0]);
                return oldData;
            })
        }
        setErrors((prevErrors) => ({ ...prevErrors, image: '' }));
    }
    const validateForm = () => {
        const newErrors = {};

        // Validate each field and set the corresponding error
        if (!formData.name) {
            newErrors.name = 'Name is required';
        }

        if (!formData.price) {
            newErrors.price = 'Price is required';
        }

        if (isNaN(formData.price)) {
            newErrors.price = 'Price can only contain number inputs';
        }

        if (formData.price < 0) {
            newErrors.price = 'Price cannot be less than 0';
        }

        if (!formData.location) {
            newErrors.location = 'Location is required';
        }

        if (!formData.description) {
            newErrors.description = 'Description is required';
        }

        if (formData.image.length === 0) {
            newErrors.image = 'Image is required';
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
            <form
                onSubmit={handleFormSubmit}
                encType="multipart/form-data"
                style={{ width: '35rem', display: 'flex', flexDirection: 'column' }}
            >
                <TextField
                    label="Name"
                    variant="outlined"
                    id="name"
                    name="name"
                    autoComplete='off'
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="&#8377;Price/Hour"
                    variant="outlined"
                    id="price"
                    name="price"
                    autoComplete='off'
                    value={formData.price}
                    onChange={handleChange}
                    error={!!errors.price}
                    helperText={errors.price}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Location"
                    variant="outlined"
                    multiline
                    rows={4}
                    id="location"
                    name="location"
                    autoComplete='off'
                    value={formData.location}
                    onChange={handleChange}
                    error={!!errors.location}
                    helperText={errors.location}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    id="description"
                    name="description"
                    autoComplete='off'
                    value={formData.description}
                    onChange={handleChange}
                    error={!!errors.description}
                    helperText={errors.description}
                    sx={{ marginBottom: 2 }}
                />
                <input
                    style={{ display: 'none' }}
                    accept=".jpg, .jpeg, .png"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handleImageChange}
                />
                <label htmlFor="contained-button-file" style={{ textAlign: 'left' }}>
                    <Button
                        variant="contained"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                        sx={{ marginBottom: '0.5rem', width: '50%' }}
                    >
                        Upload Images
                    </Button>
                </label>
                <List>
                    {formData.image.map((image) => (
                        <ListItem key={image.name} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <ImageIcon sx={{ mr: 1 }} />
                                {type === 'edit' ? <ListItemText primary={image.originalname} sx={{ width: '18rem' }} /> : <ListItemText primary={image.name} sx={{ width: '18rem' }} />}
                                <IconButton edge="end" aria-label="delete" size="small" onClick={() => handleImageDelete(image)}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </ListItem>
                    ))}
                </List>

                {errors.image && (
                    <Typography variant="body2" color="error" sx={{ textAlign: 'left', marginTop: '0.5rem', marginLeft: '0.5rem' }}>
                        {errors.image}
                    </Typography>
                )}
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 4, mt: 1 }}>
                    <Button
                        variant="contained"
                        type="submit"
                        color="success"
                        id='submitButton'
                        name='submitButton'
                        sx={{ width: '40%' }}
                        disabled={loading}
                    >
                        {type === 'edit' ? 'Edit' : 'Add'} Turf
                    </Button>
                    <Link to='/turfs'>
                        <Button variant='contained' id='backButton' name='backButton' color='primary'>Back To Turfs</Button>
                    </Link>
                </Box>
            </form>
        </>
    );
}
