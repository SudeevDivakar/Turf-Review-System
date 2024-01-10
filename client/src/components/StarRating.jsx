import { Rating } from '@mui/material';
import { useState } from 'react';

export default function StarRating({ formData, setFormData }){
    
    return(
        <Rating 
        name = "size-large" 
        size = "large"
        precision = {0.5}
        value = {formData.rating}
        onChange={(event, newValue) => {
            setFormData({ ...formData, rating: newValue });
          }}
        />
    )
}