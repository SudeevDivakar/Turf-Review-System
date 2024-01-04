import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { CssBaseline, Box, Snackbar, Alert } from "@mui/material";
import TurfForm from "../components/TurfForm";
import Footer from "../components/Footer";

export default function EditTurf() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        location: '',
        description: '',
        image: ''
    });

    useEffect(() => {
        fetchTurf();
    }, []);

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const fetchTurf = async () => {
        const res = await axios.get(`http://localhost:3000/turfs/${id}`);
        setFormData((oldTurf) => {
            return {
                name: res.data.name,
                price: res.data.price,
                location: res.data.location,
                description: res.data.description,
                image: res.data.image
            };
        });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            setLoading(true);
            const res = await axios.patch(`http://localhost:3000/turfs/${id}`, formData);
            setTimeout(() => {
                navigate(`/turfs/${res.data._id}`);
            }, 1000);
            handleClick();
        } catch (err) {
            console.log('Error in Updating Turf', err);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EEF0E5' }}>
            <CssBaseline>
                <ResponsiveAppBar />
                <Box sx={{ textAlign: 'center' }}>
                    <h1>Edit Turf</h1>
                    <TurfForm handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} type='edit' loading={loading} />
                    <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Turf Successfully Edited!
                        </Alert>
                    </Snackbar>
                </Box>
                <Footer />
            </CssBaseline>
        </div>
    );
}