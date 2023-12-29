import React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#303030', marginTop: 'auto' }}>
      <Container>
        <Toolbar>
          <Typography variant="body1" color="inherit">
            &copy;Turf Review
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

