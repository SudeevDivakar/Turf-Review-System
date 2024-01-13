import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer";
import ShowMap from "../components/ShowMap";
import { CssBaseline } from "@mui/material";

export default function Map() {
    return (
        <div>
            <CssBaseline />
            <ResponsiveAppBar />
            <ShowMap />
            <Footer />
        </div>
    );
}