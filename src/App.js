import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Chatbot from './components/Chatbot';
import TokenGenerator from './components/TokenGenerator';
import AppointmentForm from './components/AppointmentForm';
import About from './components/About';
import { IconButton, Box, Paper, Typography, useTheme, useMediaQuery, Dialog, DialogTitle, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';

const App = () => {
  const [chatOpen, setChatOpen] = useState(true);
  const [currentToken, setCurrentToken] = useState(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTokenUpdate = (token, doctorInfo) => {
    setCurrentToken({ token, doctorInfo });
  };

  const handleAppointmentClick = () => {
    setShowAppointmentForm(true);
  };

  return (
    <Router>
      <Box sx={{ 
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        bgcolor: 'background.default'
      }}>
        <Routes>
          <Route path="/" element={<LandingPage onAppointmentClick={handleAppointmentClick} />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <TokenGenerator />
        
        {/* Chat Dialog */}
        <Dialog
          open={chatOpen}
          onClose={() => setChatOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              position: 'fixed',
              bottom: isMobile ? 0 : 20,
              right: isMobile ? 0 : 20,
              m: 0,
              height: isMobile ? '100vh' : '600px',
              width: isMobile ? '100%' : '400px',
              borderRadius: isMobile ? 0 : 2,
              boxShadow: isMobile ? 'none' : '0 8px 32px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <Paper
            elevation={8}
            sx={{
              position: isMobile ? 'fixed' : 'fixed',
              bottom: isMobile ? 0 : 32,
              right: isMobile ? 0 : 32,
              left: isMobile ? 0 : 'auto',
              zIndex: 1300,
              width: isMobile ? '100%' : 380,
              minWidth: isMobile ? '100%' : 300,
              maxWidth: isMobile ? '100%' : '95vw',
              height: isMobile ? '100vh' : 600,
              minHeight: isMobile ? '100vh' : 400,
              maxHeight: isMobile ? '100vh' : '90vh',
              boxShadow: isMobile ? 'none' : '0 8px 32px rgba(31,38,135,0.18)',
              borderRadius: isMobile ? 0 : 4,
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.98)',
              border: isMobile ? 'none' : '1.5px solid #e3f2fd',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              resize: isMobile ? 'none' : 'both',
              '&:hover': {
                boxShadow: isMobile ? 'none' : '0 12px 48px rgba(31,38,135,0.24)',
              },
              // Custom resize handle styling
              '&::-webkit-resizer': {
                borderWidth: '8px',
                borderStyle: 'solid',
                borderColor: 'transparentrgb(29, 150, 250) #2196f3 transparent',
                borderRadius: '0 0 4px 0',
              },
            }}
          >
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              bgcolor: 'primary.main',
              color: 'white',
              px: isMobile ? 1 : 2,
              py: isMobile ? 0.75 : 1,
              cursor: 'move',
              userSelect: 'none',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'rgba(49, 21, 21, 0.1)',
              }
            }}>
              <Typography 
                variant={isMobile ? "body1" : "subtitle1"} 
                sx={{ 
                  fontWeight: 600,
                  fontSize: isMobile ? '0.9rem' : 'inherit'
                }}
              >
                Virtual Assistant
              </Typography>
              <IconButton 
                size={isMobile ? "small" : "medium"} 
                onClick={() => setChatOpen(false)} 
                sx={{ 
                  color: 'white',
                  p: isMobile ? 0.5 : 1
                }}
              >
                <CloseIcon sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }} />
              </IconButton>
            </Box>
            <Box sx={{ 
              flex: 1, 
              minHeight: 0,
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <Chatbot onTokenUpdate={handleTokenUpdate} />
            </Box>
          </Paper>
        </Dialog>

        {/* Appointment Form Dialog */}
        <Dialog
          open={showAppointmentForm}
          onClose={() => setShowAppointmentForm(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <DialogTitle sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            background: 'linear-gradient(90deg, rgb(106, 133, 173) 0%, rgb(172, 182, 190) 100%)',
            borderBottom: '1px solid rgba(26, 46, 134, 0.1)',
          }}>
            <Typography variant="h6" component="div" sx={{ color: 'white' }}>
              Book an Appointment
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setShowAppointmentForm(false)}
              aria-label="close"
            >
              <CloseIcon sx={{ color: 'white' }} />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ p: 0 }}>
            <AppointmentForm />
          </DialogContent>
        </Dialog>

        {/* Floating Chatbox with Minimize/Maximize */}
        {chatOpen ? (
          <IconButton 
            onClick={() => setChatOpen(false)}
            sx={{ 
              position: 'fixed',
              bottom: isMobile ? 16 : 40,
              right: isMobile ? 16 : 40,
              zIndex: 1300,
              bgcolor: 'primary.main',
              color: 'white',
              boxShadow: '0 8px 32px rgba(31,38,135,0.18)',
              borderRadius: '50%',
              width: isMobile ? 48 : 64,
              height: isMobile ? 48 : 64,
              '&:hover': { 
                bgcolor: 'primary.dark',
                transform: 'scale(1.05)',
                transition: 'transform 0.2s ease'
              },
            }}
          >
            <ChatIcon sx={{ fontSize: isMobile ? 28 : 38 }} />
          </IconButton>
        ) : (
          <IconButton 
            onClick={() => setChatOpen(true)}
            sx={{ 
              position: 'fixed',
              bottom: isMobile ? 16 : 40,
              right: isMobile ? 16 : 40,
              zIndex: 1300,
              bgcolor: 'primary.main',
              color: 'white',
              boxShadow: '0 8px 32px rgba(31,38,135,0.18)',
              borderRadius: '50%',
              width: isMobile ? 48 : 64,
              height: isMobile ? 48 : 64,
              '&:hover': { 
                bgcolor: 'primary.dark',
                transform: 'scale(1.05)',
                transition: 'transform 0.2s ease'
              },
            }}
          >
            <ChatIcon sx={{ fontSize: isMobile ? 28 : 38 }} />
          </IconButton>
        )}
      </Box>
    </Router>
  );
};

export default App; 