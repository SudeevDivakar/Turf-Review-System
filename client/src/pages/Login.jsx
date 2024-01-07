import { useState } from 'react';
import { TextField, Button, Box, CssBaseline, Snackbar, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Footer from "../components/Footer";

export default function Login() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errorName, setErrorName] = useState('');
    const [open, setOpen] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
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

    const handleErrorSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorSnackbarOpen(false);
    };

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((oldFormData) => {
            return { ...oldFormData, [name]: value };
        });

        // Clear the error when the user starts typing
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};

        // Validate each field and set the corresponding error
        if (!formData.username) {
            newErrors.username = 'Userame is required';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);

        // Return true if there are no errors, false otherwise
        return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = async (evt) => {
        evt.preventDefault();
        if (validateForm()) {
            try {
                setLoading(true);
                const res = await axios.post(`http://localhost:3000/login`, formData);
                if (!res.data.Error) {
                    setTimeout(() => {
                        navigate(`/turfs`);
                    }, 1000);
                    handleClick();
                }
                else {
                    setErrorName(res.data.message);
                    setErrorSnackbarOpen(true);
                }
            } catch (err) {
                console.log('Error in Logging In User', err);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        }
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', backgroundImage: 'url(UserBackground.avif)', backgroundSize: 'cover' }}>
            <CssBaseline />
            <ResponsiveAppBar />
            <Box sx={{ textAlign: 'center', backgroundColor: 'white', mt: 10, mb: 7, padding: '2em 2em 1em 2em',  borderRadius: 4 }}>
                <h1>Login</h1>
                <Box
                    component="form"
                    onSubmit={handleFormSubmit}
                    sx={{ width: '35rem', display: 'flex', flexDirection: 'column' }}
                >
                    <TextField
                        label="Username"
                        variant="outlined"
                        id="username"
                        name="username"
                        autoComplete='off'
                        value={formData.username}
                        onChange={handleChange}
                        error={!!errors.username}
                        helperText={errors.username}
                        sx={{ marginBottom: 2 }}
                    />         
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        id="password"
                        name="password"
                        autoComplete='off'
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        sx={{ marginBottom: 2 }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button
                            variant="contained"
                            type="submit"
                            color="success"
                            id='submitButton'
                            name='submitButton'
                            sx={{ width: '40%', marginBottom: 6 }}
                            disabled={loading}
                        >
                            Login
                        </Button>
                    </Box>
                </Box>
                <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Welcome Back!
                    </Alert>
                </Snackbar>
                <Snackbar open={errorSnackbarOpen} autoHideDuration={3000} onClose={handleErrorSnackbarClose}>
                    <Alert onClose={handleErrorSnackbarClose} severity="error" sx={{ width: '100%' }}>
                        {errorName}
                    </Alert>
                </Snackbar>
            </Box>
            <Footer />
        </div>
    );
}