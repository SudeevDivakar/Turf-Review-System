import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer";
import TurfForm from "../components/TurfForm";
import { CssBaseline, Box, Snackbar, Alert } from "@mui/material";

export default function NewTurf() {
    const navigate = useNavigate();
    useEffect(() => {
        async function isLoggedIn() {
            const user = await axios.get('http://localhost:3000/profile', { withCredentials: true });
            if (!user.data) {
                navigate('/login');
            }
        }
        isLoggedIn();
    }, [navigate]);

    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        location: '',
        description: '',
        image: []
    });

    const [open, setOpen] = useState(false);
    const [openErrorSnackBar, setOpenErrorSnackBar] = useState(false);
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

    const handleErrorClick = () => {
        setOpenErrorSnackBar(true);
    };

    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenErrorSnackBar(false);
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const newFormData = new FormData();
        newFormData.append('name', formData.name);
        newFormData.append('price', formData.price);
        newFormData.append('location', formData.location);
        newFormData.append('description', formData.description);
        formData.image.forEach((i, index) => {
            newFormData.append(`image`, i)
        })
        try {
            setLoading(true);
            const res = await axios.post(`http://localhost:3000/turfs/new`, newFormData, { withCredentials: true });
            if(!res.data.Error){
                setTimeout(() => {
                    navigate(`/turfs/${res.data.turf._id}`);
                }, 1000);
                handleClick();
            }
            else{
                handleErrorClick();
            }
        } catch (err) {
            console.log('Error in Adding Turf', err);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', backgroundImage: `url(${import.meta.env.BASE_URL}TurfBackground.jpg)`, backgroundSize: 'cover' }}>
            <CssBaseline />
            <ResponsiveAppBar />
            <Box sx={{ textAlign: 'center', backgroundColor: 'white', mt: 5, mb: 4, padding: '2em 2em 0em 2em', borderRadius: 4 }}>
                <h1>Add New Turf</h1>
                <TurfForm handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} type='add' loading={loading} />
                <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Turf Successfully Added!
                    </Alert>
                </Snackbar>
                <Snackbar open={openErrorSnackBar} autoHideDuration={1000} onClose={handleErrorClose}>
                    <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
                        Cannot code Geo Keys (Address Invalid)
                    </Alert>
                </Snackbar>
            </Box>
            <Footer />
        </div>
    );
}
