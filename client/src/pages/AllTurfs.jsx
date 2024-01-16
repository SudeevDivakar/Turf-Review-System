import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer";
import { CssBaseline, Button } from "@mui/material";
import DisplayCard from "../components/DisplayCard";

export default function AllTurfs() {
    const [turfs, setTurfs] = useState([]);

    useEffect(() => {
        fetchTurfs();
    }, []);

    const fetchTurfs = async () => {
        const res = await axios.get('http://localhost:3000/turfs', { withCredentials: true });
        setTurfs((oldTurfs) => {
            return res.data;
        })
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', textAlign: 'center', backgroundColor: '#EEF0E5'}}>
            <CssBaseline>
                <ResponsiveAppBar />
                <h1>All Turfs</h1>
                {turfs.map((turf) => {
                    return <DisplayCard key={turf._id} turf={turf} />
                })}
                <Link to='/turfs/new'>
                    <Button color='success' variant='contained' sx={{ marginBottom: 6, marginTop: 3, width: '20%' }}>
                        Add Turf
                    </Button>
                </Link>
                <Footer />
            </CssBaseline>
        </div>
    );
}