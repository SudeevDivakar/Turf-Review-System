import React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#303030', marginTop: 'auto' }}>
      <Container>
        <Toolbar sx={{ dispay: 'flex', justifyContent: 'space-between' }}>
          <div>
          <Typography variant="body1" color="inherit" sx={{display: 'inline'}}>
              GitHub Code Link:
            </Typography>
            <IconButton color="inherit" href="" target="_blank">
              <GitHubIcon />
            </IconButton>
          </div>
          <div>
            <Typography variant="body1" color="inherit">
              &copy;Turf Review
            </Typography>
          </div>
          <div>
            <Typography variant="body1" color="inherit" sx={{display: 'inline'}}>
              Creator Handles : 
            </Typography>
            <IconButton color="inherit" href="https://github.com/SudeevDivakar" target="_blank">
              <GitHubIcon />
            </IconButton>
            <IconButton color="inherit" href="https://www.linkedin.com/in/sudeev-divakar-66116026a/" target="_blank">
              <LinkedInIcon />
            </IconButton>
            <IconButton color="inherit" href="https://www.instagram.com/sudeev_gb?igsh=NGl0YXJqMXpodjk5" target="_blank">
              <InstagramIcon />
            </IconButton>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
