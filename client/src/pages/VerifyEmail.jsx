import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyEmail } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import { Button, Container, Typography, Box, CircularProgress } from '@mui/material';

const VerifyEmail = () => {
  const [verificationStatus, setVerificationStatus] = useState('verifying');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyToken = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      const userParam = params.get('user');
      
      if (!token || !userParam) {
        setVerificationStatus('invalid');
        return;
      }

      try {
        // Decode user info from URL
        const user = JSON.parse(decodeURIComponent(userParam));
        
        // Verify email with token
        const resultAction = await dispatch(verifyEmail({ token, userId: user._id }));
        
        if (verifyEmail.fulfilled.match(resultAction)) {
          setVerificationStatus('success');
          // Auto-redirect after 3 seconds
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          throw new Error(resultAction.error.message || 'Verification failed');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setVerificationStatus('error');
      }
    };

    verifyToken();
  }, [dispatch, location.search, navigate]);

  const handleResendVerification = async () => {
    // This will be implemented in the next component
    navigate('/resend-verification');
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'background.paper'
        }}
      >
        {verificationStatus === 'verifying' && (
          <>
            <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />
            <Typography variant="h5" component="h1" gutterBottom>
              Verifying your email...
            </Typography>
            <Typography color="textSecondary">
              Please wait while we verify your email address.
            </Typography>
          </>
        )}

        {verificationStatus === 'success' && (
          <>
            <Box sx={{ color: 'success.main', mb: 3 }}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
              </svg>
            </Box>
            <Typography variant="h5" component="h1" gutterBottom>
              Email Verified Successfully!
            </Typography>
            <Typography color="textSecondary" paragraph>
              Thank you for verifying your email address. You'll be redirected to the login page shortly.
            </Typography>
          </>
        )}

        {verificationStatus === 'error' && (
          <>
            <Box sx={{ color: 'error.main', mb: 3 }}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
              </svg>
            </Box>
            <Typography variant="h5" component="h1" gutterBottom>
              Verification Failed
            </Typography>
            <Typography color="textSecondary" paragraph>
              The verification link is invalid or has expired. Please request a new verification email.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleResendVerification}
              sx={{ mt: 2 }}
            >
              Resend Verification Email
            </Button>
          </>
        )}

        {verificationStatus === 'invalid' && (
          <>
            <Box sx={{ color: 'warning.main', mb: 3 }}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
              </svg>
            </Box>
            <Typography variant="h5" component="h1" gutterBottom>
              Invalid Verification Link
            </Typography>
            <Typography color="textSecondary" paragraph>
              The verification link is missing required information. Please make sure you're using the link from your email.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleResendVerification}
              sx={{ mt: 2 }}
            >
              Resend Verification Email
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default VerifyEmail;
