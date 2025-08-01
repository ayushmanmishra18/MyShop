import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiX, FiClock, FiShoppingBag } from 'react-icons/fi';
import { debounce } from 'lodash';
import { 
  setSearchQuery, 
  getSearchSuggestions, 
  toggleSuggestions 
} from '../../store/slices/searchSlice';

const SearchBar = ({ isMobile = false, onSearchSubmit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  
  // Get search state from Redux
  const { query, suggestions, showingSuggestions, suggesting } = useSelector(
    (state) => ({
      query: state.search.query,
      suggestions: state.search.suggestions,
      showingSuggestions: state.search.showSuggestions,
      suggesting: state.search.suggesting,
    })
  );
  
  // Local state
  const [localQuery, setLocalQuery] = useState(query || '');
  const [isFocused, setIsFocused] = useState(false);
  
  // Debounce the search input
  const debouncedSearch = useRef(
    debounce((searchTerm) => {
      if (searchTerm.trim().length > 0) {
        dispatch(getSearchSuggestions(searchTerm));
      } else {
        dispatch(toggleSuggestions(false));
      }
    }, 300)
  ).current;
  
  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);
  
  // Update local query when Redux query changes
  useEffect(() => {
    setLocalQuery(query);
  }, [query]);
  
  // Handle input change
  const handleChange = (e) => {
    const value = e.target.value;
    setLocalQuery(value);
    
    if (value.trim().length > 2) {
      debouncedSearch(value);
    } else {
      dispatch(toggleSuggestions(false));
    }
  };
  
  // Handle search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (localQuery.trim()) {
      dispatch(setSearchQuery(localQuery));
      dispatch(toggleSuggestions(false));
      
      // Navigate to search results page
      navigate(`/search?q=${encodeURIComponent(localQuery)}`);
      
      // Call onSearchSubmit callback if provided (for mobile)
      if (onSearchSubmit) {
        onSearchSubmit();
      }
      
      // Blur the input to close the keyboard on mobile
      if (searchInputRef.current) {
        searchInputRef.current.blur();
      }
    }
  };
  
  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setLocalQuery(suggestion);
    dispatch(setSearchQuery(suggestion));
    dispatch(toggleSuggestions(false));
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
    
    if (onSearchSubmit) {
      onSearchSubmit();
    }
  };
  
  // Clear search
  const clearSearch = () => {
    setLocalQuery('');
    dispatch(setSearchQuery(''));
    dispatch(toggleSuggestions(false));
    
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };
  
  // Show suggestions when input is focused
  const handleFocus = () => {
    setIsFocused(true);
    if (localQuery.trim().length > 2) {
      dispatch(toggleSuggestions(true));
    }
  };
  
  // Hide suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        dispatch(toggleSuggestions(false));
        setIsFocused(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch]);
  
  return (
    <div className={`relative ${isMobile ? 'w-full' : 'w-full max-w-2xl'}`} ref={searchInputRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={localQuery}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Search for products..."
            className={`w-full py-2 pl-10 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              isMobile ? 'text-sm' : 'text-base'
            }`}
            aria-label="Search products"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          {localQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <FiX className="h-5 w-5" />
            </button>
          )}
        </div>
        
        {/* Search button for mobile */}
        {isMobile && (
          <button 
            type="submit"
            className="mt-2 w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
          >
            Search
          </button>
        )}
      </form>
      
      {/* Search suggestions dropdown */}
      {showingSuggestions && isFocused && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg">
          <div className="py-1">
            {suggesting ? (
              <div className="px-4 py-2 text-sm text-gray-500">
                Searching...
              </div>
            ) : suggestions.length > 0 ? (
              <>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <FiClock className="mr-2 h-4 w-4 text-gray-400" />
                    <span>{suggestion}</span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full text-left px-4 py-2 text-sm font-medium text-primary-600 hover:bg-gray-100 flex items-center border-t border-gray-100"
                >
                  <FiSearch className="mr-2 h-4 w-4" />
                  Search for "{localQuery}"
                </button>
              </>
            ) : localQuery.trim().length > 0 ? (
              <div className="px-4 py-2 text-sm text-gray-500">
                No results found for "{localQuery}"
              </div>
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                Start typing to search for products
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
