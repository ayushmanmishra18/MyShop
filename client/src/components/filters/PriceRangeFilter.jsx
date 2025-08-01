import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Slider, Typography, Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { debounce } from 'lodash';
import { updateFilters } from '../../store/slices/searchSlice';

const PriceSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.primary.main,
  height: 4,
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: '0 0 0 8px rgba(99, 102, 241, 0.16)',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-mark': {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    '&.MuiSlider-markActive': {
      opacity: 1,
      backgroundColor: 'currentColor',
    },
  },
}));

const PriceRangeFilter = () => {
  const dispatch = useDispatch();
  
  // Get price range from Redux
  const { minPrice, maxPrice, priceRange } = useSelector(
    (state) => ({
      minPrice: state.search.filters.minPrice,
      maxPrice: state.search.filters.maxPrice,
      priceRange: state.search.filters.priceRange,
    })
  );
  
  // Local state for the slider
  const [value, setValue] = useState([minPrice, maxPrice]);
  
  // Update local state when Redux state changes
  useEffect(() => {
    setValue([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);
  
  // Debounce the price range update
  const debouncedUpdate = React.useRef(
    debounce((newValue) => {
      dispatch(
        updateFilters({
          minPrice: newValue[0],
          maxPrice: newValue[1],
        })
      );
    }, 500)
  ).current;
  
  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);
  
  // Handle slider change
  const handleChange = (event, newValue) => {
    setValue(newValue);
    debouncedUpdate(newValue);
  };
  
  // Handle manual input change
  const handleInputChange = (index) => (event) => {
    const newValue = [...value];
    const inputValue = Number(event.target.value);
    
    // Validate input
    if (isNaN(inputValue)) return;
    
    // Ensure min/max constraints
    if (index === 0) {
      newValue[0] = Math.min(inputValue, value[1] - 1);
      newValue[0] = Math.max(newValue[0], priceRange.min);
    } else {
      newValue[1] = Math.max(inputValue, value[0] + 1);
      newValue[1] = Math.min(newValue[1], priceRange.max);
    }
    
    setValue(newValue);
    dispatch(
      updateFilters({
        minPrice: newValue[0],
        maxPrice: newValue[1],
      })
    );
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
      <Typography variant="subtitle1" className="font-medium text-gray-900">
        Price Range
      </Typography>
      
      <Box className="px-2">
        <PriceSlider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="price-range-slider"
          min={priceRange.min}
          max={priceRange.max}
          step={1}
          valueLabelFormat={(value) => formatCurrency(value)}
        />
      </Box>
      
      <div className="flex items-center justify-between space-x-4">
        <div className="flex-1">
          <label htmlFor="min-price" className="block text-sm font-medium text-gray-700 mb-1">
            Min
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="min-price"
              value={value[0]}
              onChange={handleInputChange(0)}
              className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
              min={priceRange.min}
              max={value[1] - 1}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-center pt-5">
          <span className="text-gray-400">-</span>
        </div>
        
        <div className="flex-1">
          <label htmlFor="max-price" className="block text-sm font-medium text-gray-700 mb-1">
            Max
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="max-price"
              value={value[1]}
              onChange={handleInputChange(1)}
              className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
              min={value[0] + 1}
              max={priceRange.max}
            />
          </div>
        </div>
      </div>
      
      <div className="text-xs text-gray-500 text-center">
        Range: {formatCurrency(priceRange.min)} - {formatCurrency(priceRange.max)}
      </div>
    </div>
  );
};

export default PriceRangeFilter;
