import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPriceRange } from '../../store/slices/filterSlice';
import { XMarkIcon } from '@heroicons/react/24/outline';

const PriceRangeFilter = () => {
  const dispatch = useDispatch();
  const { priceRange } = useSelector((state) => state.filters);
  const [minPrice, setMinPrice] = useState(priceRange?.min || '');
  const [maxPrice, setMaxPrice] = useState(priceRange?.max || '');
  const [isActive, setIsActive] = useState(!!priceRange?.min || !!priceRange?.max);

  // Update local state when priceRange from Redux changes
  useEffect(() => {
    setMinPrice(priceRange?.min || '');
    setMaxPrice(priceRange?.max || '');
    setIsActive(!!priceRange?.min || !!priceRange?.max);
  }, [priceRange]);

  const handleMinPriceChange = (e) => {
    const value = e.target.value === '' ? '' : Math.max(0, Number(e.target.value));
    setMinPrice(value);
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value === '' ? '' : Math.max(0, Number(e.target.value));
    setMaxPrice(value);
  };

  const handleApply = () => {
    const priceFilter = {};
    
    if (minPrice !== '') {
      priceFilter.min = Number(minPrice);
    }
    
    if (maxPrice !== '') {
      priceFilter.max = Number(maxPrice);
    }
    
    // Only apply if at least one value is provided
    if (Object.keys(priceFilter).length > 0) {
      dispatch(setPriceRange(priceFilter));
      setIsActive(true);
    } else {
      // If both fields are empty, clear the filter
      handleClear();
    }
  };

  const handleClear = () => {
    dispatch(setPriceRange({}));
    setMinPrice('');
    setMaxPrice('');
    setIsActive(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleApply();
    }
  };

  return (
    <div className="border-b border-gray-200 py-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-900">Price Range</h3>
        {isActive && (
          <button
            type="button"
            onClick={handleClear}
            className="text-xs text-gray-500 hover:text-gray-700 flex items-center"
          >
            <XMarkIcon className="h-3 w-3 mr-1" />
            Clear
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="minPrice" className="block text-xs font-medium text-gray-700 mb-1">
              Min ($)
            </label>
            <input
              type="number"
              id="minPrice"
              min="0"
              value={minPrice}
              onChange={handleMinPriceChange}
              onKeyDown={handleKeyDown}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="0"
            />
          </div>
          
          <div>
            <label htmlFor="maxPrice" className="block text-xs font-medium text-gray-700 mb-1">
              Max ($)
            </label>
            <input
              type="number"
              id="maxPrice"
              min={minPrice !== '' ? minPrice : '0'}
              value={maxPrice}
              onChange={handleMaxPriceChange}
              onKeyDown={handleKeyDown}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="1000"
            />
          </div>
        </div>
        
        <button
          type="button"
          onClick={handleApply}
          disabled={!minPrice && !maxPrice}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            minPrice || maxPrice
              ? 'bg-primary-600 hover:bg-primary-700'
              : 'bg-gray-300 cursor-not-allowed'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
        >
          Apply
        </button>
        
        {isActive && (minPrice || maxPrice) && (
          <div className="mt-2 text-xs text-gray-500">
            Filtering: 
            {minPrice && ` $${minPrice}`}
            {minPrice && maxPrice && ' - '}
            {maxPrice && ` $${maxPrice}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceRangeFilter;
