import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function NewTurf(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        rating: 0,
        location: '',
        review: ''
    })

    const handleChange = (evt) => {
        const { name, value } = evt.target; 
        setFormData((oldFormData) => {
            return {...oldFormData, [name]: value}
        })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try{
            const res = await axios.post('http://localhost:3000/turfs/new' , formData);
            navigate('/turfs');
        }
        catch(err){
            console.log('Error in Adding Turf', err);
        }
    }   

    return(
        <>
            <h1>Add New Turf</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" value={formData.name} id='name' name='name' onChange={handleChange} />
                <label htmlFor="price">Price</label>
                <input type="number" value={formData.price} id='price' name='price' onChange={handleChange} />
                <label htmlFor="rating">Rating</label>
                <input type="number" value={formData.rating} id='rating' name='rating' onChange={handleChange} />
                <label htmlFor="location">Location</label>
                <textarea name="location" id="location" cols="30" rows="10" value={formData.location} onChange={handleChange}></textarea>
                <label htmlFor="review">Review</label>
                <textarea name="review" id="review" cols="30" rows="10" value={formData.review} onChange={handleChange}></textarea>
                <button>Add Turf</button>
            </form>
            <Link to='/turfs'>Back To Turfs</Link>
        </>
    )
}