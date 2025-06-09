import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  TextField,
  Snackbar,
  Alert,
  Container
} from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';

const TokenGenerator = () => {
  const [token, setToken] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const generateToken = () => {
    // Generate a random token with 32 characters
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const tokenLength = 32;
    let newToken = '';
    for (let i = 0; i < tokenLength; i++) {
      newToken += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setToken(newToken);
  };

  useEffect(() => {
    generateToken();
  }, []);

  const handleCopyToken = () => {
    navigator.clipboard.writeText(token);
    setAlertMessage('Token copied to clipboard!');
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <Container maxWidth="sm">
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mt: 4, 
          borderRadius: 2,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Token Generator
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          {/* Token Display */}
          <TextField
            fullWidth
            value={token}
            variant="outlined"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <Button
                  onClick={handleCopyToken}
                  startIcon={<ContentCopyIcon />}
                  sx={{ minWidth: 'auto' }}
                >
                  Copy
                </Button>
              ),
            }}
            sx={{ mb: 2 }}
          />

          {/* QR Code */}
          <Box sx={{ 
            p: 2, 
            bgcolor: 'white', 
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <QRCodeSVG
              value={token}
              size={200}
              level="H"
              includeMargin={true}
            />
          </Box>

          {/* Generate New Token Button */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<RefreshIcon />}
            onClick={generateToken}
            sx={{ mt: 2 }}
          >
            Generate New Token
          </Button>
        </Box>

        <Snackbar 
          open={showAlert} 
          autoHideDuration={3000} 
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default TokenGenerator; 