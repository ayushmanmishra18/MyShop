import axios from 'axios';
import { getAuthHeader } from '../utils/authUtils';

const API_URL = '/api/v1/products';

// Search products with filters
const searchProducts = async (searchParams, signal) => {
  try {
    // Convert searchParams object to query string
    const queryParams = new URLSearchParams();
    
    // Add search query if provided
    if (searchParams.query) {
      queryParams.append('search', searchParams.query);
    }
    
    // Add price range filters
    if (searchParams.minPrice) {
      queryParams.append('price[gte]', searchParams.minPrice);
    }
    if (searchParams.maxPrice) {
      queryParams.append('price[lte]', searchParams.maxPrice);
    }
    
    // Add category filter
    if (searchParams.category) {
      queryParams.append('category', searchParams.category);
    }
    
    // Add rating filter
    if (searchParams.rating) {
      queryParams.append('ratings[gte]', searchParams.rating);
    }
    
    // Add in-stock filter
    if (searchParams.inStockOnly) {
      queryParams.append('inStock', 'true');
    }
    
    // Add on-sale filter
    if (searchParams.onSaleOnly) {
      queryParams.append('onSale', 'true');
    }
    
    // Add sorting
    if (searchParams.sortBy) {
      let sortValue = '';
      switch (searchParams.sortBy) {
        case 'price-asc':
          sortValue = 'price';
          break;
        case 'price-desc':
          sortValue = '-price';
          break;
        case 'newest':
          sortValue = '-createdAt';
          break;
        case 'rating':
          sortValue = '-ratingsAverage';
          break;
        case 'featured':
        default:
          sortValue = '-isFeatured -createdAt';
      }
      queryParams.append('sort', sortValue);
    }
    
    // Add pagination
    if (searchParams.page) {
      queryParams.append('page', searchParams.page);
    }
    if (searchParams.limit) {
      queryParams.append('limit', searchParams.limit);
    }
    
    const response = await axios.get(
      `${API_URL}?${queryParams.toString()}`,
      { 
        headers: getAuthHeader(),
        signal 
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Search error:', error);
    throw error.response?.data?.message || 'Failed to perform search';
  }
};

// Get search suggestions
const getSearchSuggestions = async (query, limit = 5) => {
  try {
    if (!query || query.trim() === '') {
      return [];
    }
    
    const response = await axios.get(
      `${API_URL}/suggestions?q=${encodeURIComponent(query)}&limit=${limit}`,
      { headers: getAuthHeader() }
    );
    
    return response.data.suggestions || [];
  } catch (error) {
    console.error('Search suggestions error:', error);
    return [];
  }
};

// Get price range for filters
const getPriceRange = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/price-range`,
      { headers: getAuthHeader() }
    );
    
    return response.data.data || { min: 0, max: 1000 };
  } catch (error) {
    console.error('Error fetching price range:', error);
    return { min: 0, max: 1000 };
  }
};

// Get all categories for filters
const getCategories = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/categories`,
      { headers: getAuthHeader() }
    );
    
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

const searchService = {
  searchProducts,
  getSearchSuggestions,
  getPriceRange,
  getCategories,
};

export default searchService;
