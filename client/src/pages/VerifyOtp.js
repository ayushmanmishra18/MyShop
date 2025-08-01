import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail } from '../services/authService';
import { clearError } from '../store/slices/authSlice';

const VerifyOtp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [verificationStatus, setVerificationStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Get email from location state or query params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const emailFromParams = searchParams.get('email');
    
    if (location.state?.email) {
      setEmail(location.state.email);
    } else if (emailFromParams) {
      setEmail(emailFromParams);
    } else {
      // If no email is found, redirect to register page
      navigate('/register');
    }
    
    // Clear any previous errors when component mounts
    dispatch(clearError());
    
    return () => {
      // Cleanup
      setError('');
      setVerificationStatus('');
    };
  }, [location, navigate, dispatch]);
  
  const handleOtpChange = (element, index) => {
    // Allow only numbers
    if (element.target.value && !/^[0-9]+$/.test(element.target.value)) {
      return;
    }
    
    const newOtp = [...otp];
    newOtp[index] = element.target.value;
    setOtp(newOtp);
    
    // Auto focus to next input
    if (element.target.value && element.target.nextSibling) {
      element.target.nextSibling.focus();
    }
    
    // Clear any previous errors when user starts typing
    if (error) {
      setError('');
    }
  };
  
  const handleKeyDown = (e, index) => {
    // Handle backspace to move to previous input
    if (e.key === 'Backspace' && !e.target.value && e.target.previousSibling) {
      e.preventDefault();
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      e.target.previousSibling.focus();
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const otpValue = otp.join('');
    
    // Basic validation
    if (otpValue.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    
    if (!email) {
      setError('Email not found. Please try registering again.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Call the verifyEmail service function directly
      const response = await verifyEmail({ email, otp: otpValue });
      
      if (response.success) {
        setVerificationStatus('success');
        // Store the token and redirect to login after a short delay
        localStorage.setItem('token', response.token);
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate('/login', { 
            state: { 
              message: 'Email verified successfully! Please log in to continue.' 
            } 
          });
        }, 2000);
      } else {
        setError(response.message || 'Verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setError(error.message || 'An error occurred during verification. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleResendOtp = async () => {
    if (!email) {
      setError('Email not found. Please try registering again.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Call the resend verification email endpoint
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/auth/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend OTP');
      }
      
      setVerificationStatus('resent');
    } catch (error) {
      console.error('Resend OTP error:', error);
      setError(error.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Verify Your Email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a 6-digit verification code to <span className="font-medium">{email}</span>
          </p>
        </div>

        {verificationStatus === 'success' ? (
          <div className="rounded-md bg-green-50 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Email verified successfully! Redirecting to login...
                </p>
              </div>
            </div>
          </div>
        ) : verificationStatus === 'resent' ? (
          <div className="rounded-md bg-blue-50 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-800">
                  A new verification code has been sent to your email.
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="flex justify-center space-x-2 mb-6">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="appearance-none rounded-md relative block w-12 h-12 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 text-center focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  disabled={isLoading}
                />
              ))}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? 'Verifying...' : 'Verify Email'}
            </button>
          </div>
          
          <div className="text-center text-sm">
            <p className="text-gray-600">
              Didn't receive a code?{' '}
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isLoading}
                className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
              >
                {isLoading ? 'Sending...' : 'Resend OTP'}
              </button>
            </p>
          </div>
        </form>
        
        <div className="mt-4 text-center text-sm">
          <Link 
            to="/register" 
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Back to Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;