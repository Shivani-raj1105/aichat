import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid,
  Card,
  CardContent,
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
}));

const About = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          About Us
        </Typography>
        
        <StyledPaper elevation={3}>
          <Typography variant="h5" gutterBottom color="primary">
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph>
            We are dedicated to providing exceptional front desk services, streamlining visitor management, 
            and creating a welcoming environment for all guests. Our digital solutions make check-ins 
            seamless and efficient while maintaining the personal touch that makes visitors feel valued.
          </Typography>
        </StyledPaper>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: 'primary.main' }}>
                    <Typography variant="h4">✓</Typography>
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    Efficiency
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    Streamlined check-in processes and digital visitor management
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: 'primary.main' }}>
                    <Typography variant="h4">🔒</Typography>
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    Security
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    Secure visitor tracking and access control systems
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: 'primary.main' }}>
                    <Typography variant="h4">👥</Typography>
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    Hospitality
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    Professional and welcoming service for all visitors
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <StyledPaper elevation={3} sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom color="primary">
            Our Technology
          </Typography>
          <Typography variant="body1" paragraph>
            Built with modern web technologies including React and Material-UI, our front desk solution 
            offers a responsive, user-friendly interface that works seamlessly across all devices. 
            We leverage QR code technology for quick check-ins and maintain a robust backend system 
            for secure data management.
          </Typography>
        </StyledPaper>
      </Box>
    </Container>
  );
};

export default About; 