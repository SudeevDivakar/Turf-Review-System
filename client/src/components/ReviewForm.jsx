import React, { useState } from "react";
import { Slider, TextField, Box, Button, Typography } from "@mui/material";
import StarRating from "./StarRating";

export default function ReviewForm({ handleReviewSubmit, formData, setFormData }) {

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newError = {};

        if (!formData.review) {
            newError.review = 'Review is required!';
        }

        setErrors(newError);

        return Object.keys(newError).length === 0;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

        // Clear the error when the user starts typing
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const handleFormSubmit = (evt) => {
        evt.preventDefault();

        if (validateForm()) {
            // Call the provided handleSubmit function only if the form is valid
            handleReviewSubmit(evt);
        }
    };

    return (
        <Box sx={{ textAlign: 'left', width: '32rem', margin: "auto" }} component="form" onSubmit={handleFormSubmit}>
            <Typography variant="h4" fontWeight='bold' sx={{ mt: 3, mb: 3 }} gutterBottom>
                Leave a Review
            </Typography>
            <Typography variant="h6" gutterBottom>
                Rating
            </Typography>
            <StarRating formData={formData} setFormData={setFormData} />
            <TextField
                label="Review"
                variant="outlined"
                multiline
                rows={4}
                id="review"
                name="review"
                autoComplete="off"
                value={formData.review}
                onChange={handleChange}
                error={!!errors.review}
                helperText={errors.review}
                sx={{ mb: 3, backgroundColor: "white", width: '100%' }}
            />
            <Button variant="contained" color="success" type="submit" id="submitButton" name="submitButton" sx={{ width: '50%', mb: 4 }}>
                Add Review
            </Button>
        </Box>
    );
}
