import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loader = ({ message = 'Loading...', fullScreen = true, size = 40, thickness = 4 }) => {
  const loader = (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center"
      textAlign="center"
    >
      <CircularProgress 
        size={size} 
        thickness={thickness}
        sx={{
          color: (theme) => theme.palette.primary.main,
          mb: 2
        }}
      />
      {message && (
        <Typography 
          variant="body1" 
          color="textSecondary"
          sx={{ mt: 1 }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );

  if (fullScreen) {
    return (
      <Box 
        position="fixed" 
        top={0} 
        left={0} 
        right={0} 
        bottom={0} 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        bgcolor="background.paper"
        zIndex={9999}
      >
        {loader}
      </Box>
    );
  }

  return loader;
};

export default Loader;
