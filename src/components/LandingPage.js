import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Avatar, Stack, Container } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const doctorImg = 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=facearea&w=400&h=400&facepad=2';

const partners = [
  { name: 'Dr.Shivani Raj', logo: ' ' },
  { name: 'MediaFire', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/MediaFire_logo.png' },
  { name: 'NVIDIA', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.png' },
  { name: 'AC Doctor', logo: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png' },
  { name: 'WDO', logo: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png' },
];

export default function LandingPage({ onAppointmentClick }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg,rgb(126, 150, 167) 0%, #bbdefb 100%)' }}>
      {/* Header */}
      <AppBar position="static" elevation={0} sx={{ background: 'transparent', boxShadow: 'none', py: 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <LocalHospitalIcon color="primary" fontSize="large" />
            <Typography variant="h6" color="primary" fontWeight={700}>
              Healthcare
            </Typography>
          </Stack>
          <Stack direction="row" spacing={3} alignItems="center">
            <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
            <Button color="inherit" onClick={() => navigate('/about')}>About Us</Button>
            <Button color="inherit">Services</Button>
            <Button color="inherit">Blog</Button>
            <Button color="primary" variant="outlined" sx={{ ml: 2, borderRadius: 2 }}>Login</Button>
            <Button color="primary" variant="contained" sx={{ ml: 1, borderRadius: 2 }}>Sign up</Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography variant="h3" fontWeight={800} color="primary.main" gutterBottom>
              The Best Medical<br />and Treatment Center for You
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              We understand that injuries and acute pain can happen unexpectedly. Our emergency and specialist doctors are always here for you.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              onClick={onAppointmentClick}
              sx={{ 
                borderRadius: 3, 
                px: 4, 
                py: 1.5, 
                fontWeight: 600, 
                fontSize: '1.1rem', 
                mb: 4,
                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.2)',
                '&:hover': {
                  boxShadow: '0 6px 16px rgba(33, 150, 243, 0.3)',
                }
              }}
            >
              Make Appointment
            </Button>
            <Grid container spacing={3}>
              <Grid item>
                <Stack alignItems="center">
                  <AccessTimeIcon color="primary" fontSize="large" />
                  <Typography variant="h6" fontWeight={700}>24/7</Typography>
                  <Typography variant="body2" color="text.secondary">Emergency Service</Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Stack alignItems="center">
                  <GroupIcon color="primary" fontSize="large" />
                  <Typography variant="h6" fontWeight={700}>80+</Typography>
                  <Typography variant="body2" color="text.secondary">Specialist doctor</Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Stack alignItems="center">
                  <EmojiEventsIcon color="primary" fontSize="large" />
                  <Typography variant="h6" fontWeight={700}>100k+</Typography>
                  <Typography variant="body2" color="text.secondary">Happy Patient</Typography>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar src={doctorImg} alt="Doctor" sx={{ width: 260, height: 260, boxShadow: 6, border: '8px solid #fff' }} />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Cards Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3, p: 2, minHeight: 160, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={700} color="primary.main">Latest Visited doctor</Typography>
                <Stack direction="row" spacing={1} mt={2}>
                  <Avatar src="https://randomuser.me/api/portraits/women/44.jpg" />
                  <Avatar src="https://randomuser.me/api/portraits/men/45.jpg" />
                  <Avatar src="https://randomuser.me/api/portraits/women/46.jpg" />
                </Stack>
                <Typography variant="body2" color="text.secondary" mt={2}>More than 4<sup>th</sup> doctor at your service.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3, p: 2, minHeight: 160, boxShadow: 3, background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={700} color="primary.main">Doctors</Typography>
                <Typography variant="h6" fontWeight={800} color="primary" mt={2}>Our Specialist doctor</Typography>
                <Stack direction="row" spacing={2} mt={2}>
                  <Avatar src="https://randomuser.me/api/portraits/men/47.jpg" />
                  <Avatar src="https://randomuser.me/api/portraits/women/48.jpg" />
                  <Avatar src="https://randomuser.me/api/portraits/men/49.jpg" />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3, p: 2, minHeight: 160, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={700} color="primary.main">Connect with our professional doctor</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 3, borderRadius: 2, px: 3 }}>Connect Now</Button>
                <Box mt={2}>
                  <Avatar src="https://images.unsplash.com/photo-1511174511562-5f97f4f4e0c8?auto=format&fit=facearea&w=80&h=80&facepad=2" sx={{ width: 56, height: 56, mr: 1 }} />
                  <Avatar src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=80&h=80&facepad=2" sx={{ width: 56, height: 56 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Partners Section */}
      <Box sx={{ background: '#fff', py: 3, borderTopLeftRadius: 32, borderTopRightRadius: 32, boxShadow: 2, mt: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            {partners.map((p) => (
              <Grid item key={p.name}>
                <Box component="img" src={p.logo} alt={p.name} sx={{ height: 32, mx: 2, opacity: 0.7 }} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
} 