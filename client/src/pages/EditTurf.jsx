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

    const [errorOpen, setErrorOpen] = useState(false);

    const handleErrorClick = () => {
        setErrorOpen(true);
    };

    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorOpen(false);
    };

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
        images: [],            //Stores already added photos
        image: [],            //used to store newly added photos
        deleteImages: []       //Stores photos which we want to delete
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
        try {
            const res = await axios.get(`http://localhost:3000/turfs/${id}`, { withCredentials: true });
            if (res.data !== null) {
                setFormData((oldTurf) => {
                    return {
                        name: res.data.name,
                        price: res.data.price,
                        location: res.data.location,
                        description: res.data.description,
                        images: res.data.image,           //Stores already added photos
                        deleteImages: [],             //Stores photos which we want to delete
                        image: []               //used to store newly added photos 
                    };
                });
            }
            else {
                navigate('/notFound');
            }
        }
        catch {
            navigate('/notFound');
        }
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const newFormData = new FormData();
        newFormData.append('name', formData.name);
        newFormData.append('price', formData.price);
        newFormData.append('location', formData.location);
        newFormData.append('description', formData.description);

        formData.image.forEach((i) => {
            newFormData.append('image', i);
        });

        try {
            if (formData.deleteImages.length > 0) {
                const deleteRes = await axios.delete(`http://localhost:3000/turfs/${id}/deleteImages`, {
                    data: { imagesToDelete: formData.deleteImages },
                    withCredentials: true,
                });
                if(deleteRes.Error){
                    console.log('Could Not Delete Image');
                }
            }

            setLoading(true);

            const res = await axios.patch(`http://localhost:3000/turfs/${id}`, newFormData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            if (res.data.Error) {
                setTimeout(() => {
                    navigate('/turfs');
                }, 1000);
                handleErrorClick();
            }
            else {
                setTimeout(() => {
                    navigate(`/turfs/${res.data.newTurf._id}`);
                }, 1000);
                handleClick();
            }
        } catch (err) {
            console.log('Error in Updating Turf', err);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', backgroundImage: `url(${import.meta.env.BASE_URL}TurfBackground.jpg)`, backgroundSize: 'cover' }}>
            <CssBaseline>
                <ResponsiveAppBar />
                <Box sx={{ textAlign: 'center', backgroundColor: 'white', mt: 5, mb: 4, padding: '2em 2em 0em 2em', borderRadius: 4 }}>
                    <h1>Edit Turf</h1>
                    <TurfForm handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} type='edit' loading={loading} />
                    <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Turf Successfully Edited!
                        </Alert>
                    </Snackbar>
                    <Snackbar open={errorOpen} autoHideDuration={1000} onClose={handleErrorClose}>
                        <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
                            You Do Not Have Permission to do That
                        </Alert>
                    </Snackbar>
                </Box>
                <Footer />
            </CssBaseline>
        </div>
    );
}