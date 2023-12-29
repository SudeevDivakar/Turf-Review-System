import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { CssBaseline, Box } from "@mui/material";
import TurfForm from "../components/TurfForm";
import Footer from "../components/Footer";

export default function EditTurf() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        rating: 0,
        location: '',
        review: '',
        image: ''
    });

    useEffect(() => {
        fetchTurf();
    }, []);

    const fetchTurf = async () => {
        const res = await axios.get(`http://localhost:3000/turfs/${id}`);
        setFormData((oldTurf) => {
            return {
                name: res.data.name,
                price: res.data.price,
                rating: res.data.rating,
                location: res.data.location,
                review: res.data.review,
                image: res.data.image
            };
        });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const res = await axios.patch(`http://localhost:3000/turfs/${id}`, formData);
            navigate(`/turfs/${res.data._id}`);
        }
        catch (err) {
            console.log('Error in Updating Turf', err);
        }
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <CssBaseline>
                <ResponsiveAppBar />
                <Box sx={{ textAlign: 'center' }}>
                    <h1>Edit Turf</h1>
                    <TurfForm handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} type='edit' />
                </Box>
                <Footer />
            </CssBaseline>
        </div>
    )
}