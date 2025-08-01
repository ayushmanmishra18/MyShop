import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resendVerificationEmail } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  CircularProgress,
  Link as MuiLink
} from '@mui/material';

const ResendVerification = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Pre-fill email if user is logged in but not verified
  useState(() => {
    if (user && !user.isVerified) {
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    try {
      setIsSubmitting(true);
      const resultAction = await dispatch(resendVerificationEmail({ email }));
      
      if (resendVerificationEmail.fulfilled.match(resultAction)) {
        setIsSubmitted(true);
      } else {
        throw new Error(resultAction.error.message || 'Failed to send verification email');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Failed to send verification email');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Box sx={{ color: 'success.main', mb: 3 }}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
            </svg>
          </Box>
          <Typography component="h1" variant="h5" gutterBottom>
            Verification Email Sent!
          </Typography>
          <Typography paragraph>
            We've sent a verification link to <strong>{email}</strong>.
          </Typography>
          <Typography paragraph>
            Please check your inbox and click on the verification link to verify your email address.
          </Typography>
          <Typography paragraph>
            If you don't see the email, please check your spam folder.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/login')}
            sx={{ mt: 2 }}
          >
            Back to Login
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Resend Verification Email
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center" paragraph>
            Enter your email address and we'll send you a new verification link.
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!!user?.email}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Send Verification Email'
              )}
            </Button>
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <MuiLink 
                component={Link} 
                to="/login" 
                variant="body2"
                sx={{ textDecoration: 'none' }}
              >
                Back to Login
              </MuiLink>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ResendVerification;
