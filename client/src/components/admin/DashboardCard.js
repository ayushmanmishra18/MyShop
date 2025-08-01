import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Grid 
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme, color = 'primary' }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
  borderLeft: `4px solid ${theme.palette[color].main}`,
}));

const DashboardCard = ({ title, value, icon: Icon, color = 'primary', onClick }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <StyledCard 
        color={color}
        onClick={onClick}
        sx={{ cursor: onClick ? 'pointer' : 'default' }}
      >
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <div>
              <Typography color="textSecondary" gutterBottom>
                {title}
              </Typography>
              <Typography variant="h4" component="h2">
                {value}
              </Typography>
            </div>
            {Icon && (
              <Box
                bgcolor={`${color}.light`}
                color={`${color}.contrastText`}
                p={1.5}
                borderRadius="50%"
                display="flex"
              >
                <Icon fontSize="large" />
              </Box>
            )}
          </Box>
        </CardContent>
      </StyledCard>
    </Grid>
  );
};

export default DashboardCard;
