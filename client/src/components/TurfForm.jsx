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

    const handleImageExistingDelete = (imageToDelete) => {
        if (formData.images.length > 1) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                images: prevFormData.images.filter((image) => image !== imageToDelete),
                deleteImages: [...(prevFormData.deleteImages || []), imageToDelete.filename]
            }));
        }
    }

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

        if (type !== 'edit' && formData.image.length === 0) {
            newErrors.image = 'Image is required';
        }

        if(type === 'edit' && isNaN(formData.latitude)){
            newErrors.latitude = 'Latitude Must Be A Number';
        }

        if(type === 'edit' && (formData.latitude > 90 || formData.latitude < -90)){
            newErrors.latitude = 'Latitude Must be Between -90 and 90';
        }

        if(type === 'edit' && (formData.longitude > 180 || formData.longitude < -180)){
            newErrors.latitude = 'Longitude Must be Between -180 and 180';
        }

        if(type === 'edit' && isNaN(formData.longitude)){
            newErrors.longitude = 'Longitude Must be a Number';
        }

        if(type === 'edit' && (!formData.longitude && formData.latitude) || (formData.longitude && !formData.latitude)){
            newErrors.latitude = 'Fill Both Coordinates or Neither';
            newErrors.longitude = 'Fill Both Coordinates or Neither';
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
                {type === 'edit' &&
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left', mb: 1.5, ml: 1 }}>
                        Location Incorrect/Not coded? Enter Latitude & Longitude
                    </Typography>}
                {type === 'edit' && 
                <Box sx={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <TextField
                    label="Latitude"
                    variant="outlined"
                    id="latitude"
                    name="latitude"
                    autoComplete='off'
                    value={formData.latitude}
                    onChange={handleChange}
                    error={!!errors.latitude}
                    helperText={errors.latitude}
                    sx={{ marginBottom: 2, width: '48%', marginRight: '2%' }}
                    />
                    <TextField
                    label="Longitude"
                    variant="outlined"
                    id="longitude"
                    name="longitude"
                    autoComplete='off'
                    value={formData.longitude}
                    onChange={handleChange}
                    error={!!errors.longitude}
                    helperText={errors.longitude}
                    sx={{ marginBottom: 2, width: '48%', marginLeft: '2%' }}
                    />
                    </Box>
                }
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
                {type === 'edit' && <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
                    Existing photos - Delete Photo
                </Typography>}
                {type === 'edit' && <List>
                    {formData.images.map((image, index) => (
                        <ListItem key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <ImageIcon sx={{ mr: 1 }} />
                                <ListItemText primary={image.originalname} sx={{ width: '18rem' }} />
                                <IconButton edge="end" aria-label="delete" size="small" onClick={() => handleImageExistingDelete(image)}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </ListItem>
                    ))}
                </List>}
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
                    {formData.image.map((image, index) => (
                        <ListItem key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <ImageIcon sx={{ mr: 1 }} />
                                <ListItemText primary={image.name} sx={{ width: '18rem' }} />
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
