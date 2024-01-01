import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer";
import TurfForm from "../components/TurfForm";
import { CssBaseline, Box } from "@mui/material";

export default function NewTurf() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        location: '',
        description: '',
        image: ''
    });

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const res = await axios.post(`http://localhost:3000/turfs/new`, formData);
            navigate(`/turfs/${res.data._id}`);
        }
        catch (err) {
            console.log('Error in Adding Turf', err);
        }
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EEF0E5' }}>
            <CssBaseline />
            <ResponsiveAppBar />
            <Box sx={{ textAlign: 'center' }}>
                <h1>Add New Turf</h1>
                <TurfForm handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} type='add' />
            </Box>
            <Footer />
        </div>
    )
}
