import * as React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { MenuItem, Snackbar, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const pages = [
  { label: 'Home', link: '/' },
  { label: 'All Turfs', link: '/turfs' },
  { label: 'New Turf', link: '/turfs/new' },
  { label: 'Map', link: '/map'}
];

export default function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [user, setUser] = React.useState({});
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    async function isLoggedIn() {
      const userData = await axios.get('http://localhost:3000/profile', { withCredentials: true });
      setUser(userData.data);
    }
    isLoggedIn();
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logout = async () => {
    try {
      const res = await axios.post('http://localhost:3000/logout', null, {
        withCredentials: true,
      });
      handleClick();
      setTimeout(() => {
        if (res.data.message === 'Logged out successfully') {
          axios.get('http://localhost:3000/profile', { withCredentials: true })
            .then(userData => setUser(userData.data))
            .then(navigate('/login'));
        }
      }, 1000);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#303030' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={import.meta.env.BASE_URL + 'Logo.jpg'} alt="Logo" style={{ height: '30px', marginRight: '8px' }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TREVIEW
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label}>
                  <Button
                    key={page.label}
                    component={Link}
                    to={page.link}
                    sx={{
                      color: 'inherit', // Changed color to 'inherit'
                      display: 'block',
                    }}
                  >
                    {page.label}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TREVIEW
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                component={Link}
                to={page.link}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
          {!!user ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                onClick={logout}
                color="inherit"
                sx={{ marginLeft: 2 }}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                component={Link}
                to="/login"
                color="inherit"
                sx={{ marginLeft: 2 }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                color="inherit"
                sx={{ marginLeft: 2 }}
              >
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Successfully Logged Out!
        </Alert>
      </Snackbar>
    </AppBar>
  );
}