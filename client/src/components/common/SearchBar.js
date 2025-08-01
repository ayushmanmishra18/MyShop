import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, XIcon } from '@heroicons/react/outline';
import { useDebounce } from '../../hooks/useDebounce';
import { searchProducts } from '../../store/slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';

const SearchBar = ({ isMobile = false, onClose }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchRef = useRef(null);
  const debouncedQuery = useDebounce(query, 300);
  
  const { searchResults, loading, error } = useSelector((state) => ({
    searchResults: state.products.searchResults,
    loading: state.products.loading,
    error: state.products.error,
  }));

  useEffect(() => {
    if (debouncedQuery.length > 2) {
      dispatch(searchProducts(debouncedQuery));
    }
  }, [debouncedQuery, dispatch]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setQuery('');
      setIsFocused(false);
      if (onClose) onClose();
    }
  };

  const handleResultClick = (product) => {
    navigate(`/product/${product.slug}`);
    setQuery('');
    setIsFocused(false);
    if (onClose) onClose();
  };

  const clearSearch = () => {
    setQuery('');
    setIsFocused(false);
  };

  return (
    <div className={`relative ${isMobile ? 'w-full' : 'max-w-xl mx-4'}`} ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            className={`block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
              isMobile ? 'text-base' : 'text-sm'
            }`}
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            aria-label="Search products"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              aria-label="Clear search"
            >
              <XIcon className="h-4 w-4 text-gray-400 hover:text-gray-500" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className={`absolute right-0 top-0 h-full px-4 text-sm font-medium text-white bg-primary-600 rounded-r-md border border-transparent hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
            isMobile ? 'hidden' : 'block'
          }`}
        >
          Search
        </button>
      </form>

      {/* Search Results Dropdown */}
      {isFocused && query.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto max-h-96 focus:outline-none sm:text-sm">
          {loading ? (
            <div className="px-4 py-2 text-gray-500">Searching...</div>
          ) : error ? (
            <div className="px-4 py-2 text-red-500">{error}</div>
          ) : searchResults && searchResults.length > 0 ? (
            <>
              {searchResults.slice(0, 10).map((product) => (
                <div
                  key={product._id}
                  className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleResultClick(product)}
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden">
                    <img
                      src={product.images?.[0]?.url || '/images/placeholder.png'}
                      alt={product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
              <div 
                className="px-4 py-2 text-sm text-primary-600 hover:bg-gray-50 cursor-pointer border-t border-gray-100 text-center font-medium"
                onClick={() => {
                  navigate(`/search?q=${encodeURIComponent(query)}`);
                  setIsFocused(false);
                  if (onClose) onClose();
                }}
              >
                View all results for "{query}"
              </div>
            </>
          ) : query.length > 2 ? (
            <div className="px-4 py-2 text-gray-500">No products found</div>
          ) : (
            <div className="px-4 py-2 text-gray-500">Type at least 3 characters to search</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
