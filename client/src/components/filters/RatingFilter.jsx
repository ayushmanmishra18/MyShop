import React from 'react';
import { Box, Typography, Rating, FormControl, RadioGroup, FormControlLabel, Radio, IconButton, Collapse } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon, Star as StarIcon, StarBorder as StarBorderIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const RatingFilter = ({ value, onChange }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(true);
  
  // Toggle expansion
  const handleToggle = () => {
    setExpanded(!expanded);
  };
  
  // Handle rating change
  const handleChange = (event) => {
    const newValue = event.target.value === '0' ? null : parseInt(event.target.value, 10);
    onChange(newValue);
  };
  
  // Generate rating options
  const ratingOptions = [5, 4, 3, 2, 1];
  
  return (
    <Box className="bg-white rounded-lg shadow-sm p-4">
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        mb={2}
        onClick={handleToggle}
        sx={{ cursor: 'pointer' }}
      >
        <Typography variant="subtitle1" className="font-medium">
          Customer Reviews
        </Typography>
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Box>
      
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <FormControl component="fieldset" fullWidth>
          <RadioGroup
            aria-label="rating-filter"
            name="rating-filter"
            value={value || '0'}
            onChange={handleChange}
          >
            {ratingOptions.map((rating) => (
              <FormControlLabel
                key={rating}
                value={rating.toString()}
                control={
                  <Radio 
                    size="small" 
                    sx={{ 
                      color: theme.palette.primary.main,
                      '&.Mui-checked': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  />
                }
                label={
                  <Box display="flex" alignItems="center">
                    <Rating
                      name={`rating-${rating}`}
                      value={rating}
                      readOnly
                      precision={0.5}
                      icon={<StarIcon fontSize="small" />}
                      emptyIcon={<StarBorderIcon fontSize="small" />}
                      sx={{ 
                        color: theme.palette.warning.main,
                        '& .MuiRating-iconFilled': {
                          color: theme.palette.warning.main,
                        },
                      }}
                    />
                    <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                      {rating === 5 ? '5.0' : `${rating} & Up`}
                    </Typography>
                  </Box>
                }
                sx={{
                  margin: 0,
                  py: 0.5,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              />
            ))}
            <FormControlLabel
              value="0"
              control={
                <Radio 
                  size="small" 
                  sx={{ 
                    color: theme.palette.primary.main,
                    '&.Mui-checked': {
                      color: theme.palette.primary.main,
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2" color="textSecondary">
                  All Ratings
                </Typography>
              }
              sx={{
                margin: 0,
                py: 0.5,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            />
          </RadioGroup>
        </FormControl>
        
        {value && (
          <Box mt={1} textAlign="right">
            <Typography 
              variant="caption" 
              color="primary"
              onClick={() => onChange(null)}
              sx={{ 
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' } 
              }}
            >
              Clear filter
            </Typography>
          </Box>
        )}
      </Collapse>
    </Box>
  );
};

export default RatingFilter;
