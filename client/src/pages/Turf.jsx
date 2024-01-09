import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer";
import { CssBaseline, Box, Container, Snackbar, Alert } from "@mui/material";
import ShowCard from "../components/ShowCard";
import ReviewForm from "../components/ReviewForm";
import Review from "../components/Review";

export default function Turf() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [turf, setTurf] = useState({ reviews: [] });
    const [formData, setFormData] = useState({
        review: "",
        rating: 2.5
    });

    const [isUser, setIsUser] = useState(false);
    useEffect(() => {
        async function isLoggedIn() {
            const user = await axios.get('http://localhost:3000/profile', {withCredentials: true}); 
            if(!user.data){
                setIsUser(false);
            }
            else{
                setIsUser(true);
            }
        }
        isLoggedIn();
    })


    useEffect(() => {
        fetchTurf();
        const isSnackbarOpen = localStorage.getItem('snackbarOpen') === 'true';
        const isDeleteSnackbarOpen = localStorage.getItem('deleteSnackbarOpen') === 'true';
        setOpenSnackbar(isSnackbarOpen);
        setOpenDeleteSnackbar(isDeleteSnackbarOpen);
    }, []);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);
    const [openDeleteTurfSnackbar, setOpenDeleteTurfSnackbar] = useState(false);

    const handleClick = () => {
        setOpenSnackbar(true);
        localStorage.setItem('snackbarOpen', 'true');
    };

    const handleDeleteSnackbarClick = () => {
        setOpenDeleteSnackbar(true);
        localStorage.setItem('deleteSnackbarOpen', 'true');
    };

    const handleDeleteTurfSnackbarClick = () => {
        setOpenDeleteTurfSnackbar(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
        localStorage.removeItem('snackbarOpen');
    };

    const handleDeleteSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenDeleteSnackbar(false);
        localStorage.removeItem('deleteSnackbarOpen');
    };

    const handleDeleteTurfSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenDeleteTurfSnackbar(false);
    };

    const fetchTurf = async () => {
        const res = await axios.get(`http://localhost:3000/turfs/${id}`, {withCredentials: true});
        if (res.data !== null) {
            setTurf((oldTurf) => {
                return res.data;
            });
        }
        else {
            navigate('/notFound');
        }
    }

    const handleDelete = async (evt) => {                                 // Deleting a turf
        evt.preventDefault();
        try {
            await axios.delete(`http://localhost:3000/turfs/${id}`, {withCredentials: true});
            setTimeout(() => {
                navigate('/turfs');
            }, 1000);
            handleDeleteTurfSnackbarClick();
        } catch {
            console.log('Error in Deleting Turf');
        }
    }

    const handleReviewSubmit = async (evt) => {                         // Adding a comment
        evt.preventDefault();
        try {
            const res = await axios.post(`http://localhost:3000/turfs/${id}/reviews`, formData, {withCredentials: true});
            handleClick();
            if (window.location.pathname === `/turfs/${id}`) {
                window.location.reload();
            } else {
                navigate(`/turfs/${id}`);
            }
        } catch (err) {
            console.log('Error in Adding Review', err);
        }
    }

    const deleteComment = async (reviewId) => {                     // Deleting a Comment
        try {
            await axios.delete(`http://localhost:3000/turfs/${id}/reviews/${reviewId}`, {withCredentials: true});
            handleDeleteSnackbarClick();
            if (window.location.pathname === `/turfs/${id}`) {
                window.location.reload();
            } else {
                navigate(`/turfs/${id}`);
            }
        } catch (err) {
            console.log('Error in Deleting Comment', err);
        }
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', textAlign: 'center', backgroundColor: '#EEF0E5' }}>
            <CssBaseline />
            <ResponsiveAppBar />
            <Container sx={{ display: 'flex', justifyContent: 'space-between', flexGrow: 1, maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
                <Box>
                    <ShowCard turf={turf} handleDelete={handleDelete} id={id} />
                </Box>
                <Box>
                    {isUser && <ReviewForm formData={formData} setFormData={setFormData} handleReviewSubmit={handleReviewSubmit} />}
                    {turf.reviews.map((review) => (
                        <Review key={review._id} review={review} deleteComment={deleteComment} />
                    ))}
                    <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Comment Successfully Added!
                        </Alert>
                    </Snackbar>
                    <Snackbar open={openDeleteSnackbar} autoHideDuration={2000} onClose={handleDeleteSnackbarClose}>
                        <Alert onClose={handleDeleteSnackbarClose} severity="success" sx={{ width: '100%' }}>
                            Comment Deleted Successfully!
                        </Alert>
                    </Snackbar>
                    <Snackbar open={openDeleteTurfSnackbar} autoHideDuration={1000} onClose={handleDeleteTurfSnackbarClose}>
                        <Alert onClose={handleDeleteTurfSnackbarClose} severity="success" sx={{ width: '100%' }}>
                            Turf Deleted Successfully!
                        </Alert>
                    </Snackbar>
                </Box>
            </Container>
            <Footer />
        </div>
    );
}
