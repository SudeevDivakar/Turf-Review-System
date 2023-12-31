import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer";
import { CssBaseline } from "@mui/material";
import ShowCard from "../components/ShowCard";

export default function Turf() {
    const navigate = useNavigate();
    const [turf, setTurf] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetchTurf();
    }, []);

    const fetchTurf = async () => {
        const res = await axios.get(`http://localhost:3000/turfs/${id}`);
        setTurf((oldTurf) => {
            return res.data;
        });
    }

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`http://localhost:3000/turfs/${id}`);
            navigate('/turfs');
        }
        catch {
            console.log('Error in Deleting Turf');
        }
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', textAlign: 'center', backgroundColor: '#EEF0E5' }}>
            <CssBaseline>
                <ResponsiveAppBar />
                <ShowCard turf={turf} handleDelete={handleDelete} id={id} />
                <Footer />
            </CssBaseline>
        </div>
    )
}