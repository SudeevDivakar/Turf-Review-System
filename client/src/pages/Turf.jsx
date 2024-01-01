import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer";
import { CssBaseline, Box, Container } from "@mui/material";
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

    useEffect(() => {
        fetchTurf();
    }, []);

    const fetchTurf = async () => {
        const res = await axios.get(`http://localhost:3000/turfs/${id}`);
        setTurf((oldTurf) => {
            return res.data;
        });
    }

    const handleDelete = async (evt) => {                                 //Deleting a turf
        evt.preventDefault();
        try {
            const res = await axios.delete(`http://localhost:3000/turfs/${id}`);
            navigate('/turfs');
        }
        catch {
            console.log('Error in Deleting Turf');
        }
    }

    const handleReviewSubmit = async (evt) => {                         //Adding a comment
        evt.preventDefault();
        try {
            const res = await axios.post(`http://localhost:3000/turfs/${id}/reviews`, formData);
            if (window.location.pathname === `/turfs/${id}`) {
                window.location.reload();
            } else {
                navigate(`/turfs/${id}`);
            }
        }
        catch (err) {
            console.log('Error in Adding Review', err);
        }
    }

    const deleteComment = async (reviewId) => {                     //Deleting a Comment
        try {
            const res = await axios.delete(`http://localhost:3000/turfs/${id}/reviews/${reviewId}`);
            if (window.location.pathname === `/turfs/${id}`) {
                window.location.reload();
            } else {
                navigate(`/turfs/${id}`);
            }
        }
        catch(err) {
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
                    <ReviewForm formData={formData} setFormData={setFormData} handleReviewSubmit={handleReviewSubmit} />
                    {turf.reviews.map((review) => (
                        <Review key={review._id} review={review} deleteComment={deleteComment} />
                    ))}
                </Box>
            </Container>
            <Footer />
        </div>
    );
}
