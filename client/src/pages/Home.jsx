import React from "react";
import { CssBaseline, Typography, Button } from "@mui/material";
import "./Home.css";
import HomeContent from "../components/HomeContent";
import ResponsiveAppBar from "../components/ResponsiveAppBar";

const Home = () => {
    return (
        <div className='homeContainer'>
            <CssBaseline />
            <ResponsiveAppBar />
            <HomeContent />
        </div>
    );
}

export default Home;
