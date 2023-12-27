import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditTurf(){
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        rating: 0,
        location: '',
        review: '',
    });

    useEffect(() => {
        fetchTurf();
    },[]);

    const fetchTurf = async () => {
        const res = await axios.get(`http://localhost:3000/turfs/${id}`);
        setFormData((oldTurf) => {
            return {
                name: res.data.name,
                price: res.data.price,
                rating: res.data.rating,
                location: res.data.location,
                review: res.data.review
            };
        });
    };

    const handleChange = (evt) => {
        const { name, value } = evt.target; 
        setFormData((oldFormData) => {
            return {...oldFormData, [name]: value}
        })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try{
            const res = await axios.patch(`http://localhost:3000/turfs/${id}`, formData);
            navigate('/turfs');
        }
        catch(err){
            console.log('Error in Updating Turf', err);
        }
    }   

    return(
        <>
            <h1>Edit Turf</h1>
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
                <button>Update Turf</button>
            </form>
            <Link to='/turfs'>Back To Turfs</Link>
        </>
    )
}