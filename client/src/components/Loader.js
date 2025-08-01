import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const Loader = ({ message = 'Loading...' }) => {
  return (
    <Box 
      display="flex" 
      flexDirection="column"
      justifyContent="center" 
      alignItems="center"
      minHeight="200px"
    >
      <CircularProgress />
      {message && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default Loader;
