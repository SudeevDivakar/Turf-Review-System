import axios from "axios";
import { useEffect } from "react";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer";
import { CssBaseline, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
    useEffect(() => {
        const fetchError = () => {
            axios.get('http://localhost:3000/error').catch((err) => console.log(
                '     _____  _______      _____\n',
                '   /  |  | \\   _  \\    /  |  |\n',
                '  /   |  |_/  /_\\  \\  /   |  |_\n',
                ' /    ^   /\\  \\_/   \\/    ^   /\n',
                ' \\____   |  \\_____  /\\____   |\n',
                '      |__|        \\/      |__|\n'
            ));
        };
        fetchError();
    }, []);
    
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', textAlign: 'center', backgroundColor: '#31304D'}}>
            <CssBaseline>
                <ResponsiveAppBar />
                <div  style={{ marginTop: '9rem'  }}>
                    <h1 style={{ fontSize: '3em', color: '#B6BBC4' }}>404 - Not Found</h1>
                    <b><p style={{ fontSize: '1.5em', color: 'white' }}>Sorry, the page you are looking for does not exist.</p></b>
                    <Link to='/turfs'><Button variant='outlined' color='primary'>Back To Turfs</Button></Link>
                </div>
                <Footer />
            </CssBaseline>
        </div>
    )
};