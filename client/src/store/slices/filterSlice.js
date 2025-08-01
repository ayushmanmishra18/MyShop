import { createSlice, createSelector } from '@reduxjs/toolkit';

// Initial filter state
const initialState = {
  // Price range filter
  priceRange: {
    min: 0,
    max: 1000,
    appliedMin: 0,
    appliedMax: 1000,
  },
  // Category filter
  categories: [],
  selectedCategory: null,
  // Rating filter
  rating: null,
  // Sorting
  sortBy: 'featured',
  sortOptions: [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'rating', label: 'Highest Rated' },
  ],
  // Search
  searchQuery: '',
  searchSuggestions: [],
  // Other filters
  inStockOnly: false,
  onSaleOnly: false,
  // Loading and error states
  loading: false,
  error: null,
  // Pagination
  currentPage: 1,
  itemsPerPage: 12,
  totalItems: 0,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // Price range actions
    setPriceRange: (state, action) => {
      state.priceRange = {
        ...state.priceRange,
        ...action.payload,
      };
    },
    applyPriceRange: (state) => {
      state.priceRange.appliedMin = state.priceRange.min;
      state.priceRange.appliedMax = state.priceRange.max;
      state.currentPage = 1; // Reset to first page when filters change
    },
    resetPriceRange: (state) => {
      state.priceRange = {
        min: 0,
        max: 1000,
        appliedMin: 0,
        appliedMax: 1000,
      };
    },
    
    // Category actions
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1;
    },
    
    // Rating actions
    setRating: (state, action) => {
      state.rating = action.payload;
      state.currentPage = 1;
    },
    
    // Sort actions
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.currentPage = 1;
    },
    
    // Search actions
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setSearchSuggestions: (state, action) => {
      state.searchSuggestions = action.payload;
    },
    clearSearch: (state) => {
      state.searchQuery = '';
      state.searchSuggestions = [];
      state.currentPage = 1;
    },
    
    // Toggle filters
    toggleInStockOnly: (state) => {
      state.inStockOnly = !state.inStockOnly;
      state.currentPage = 1;
    },
    toggleOnSaleOnly: (state) => {
      state.onSaleOnly = !state.onSaleOnly;
      state.currentPage = 1;
    },
    
    // Pagination
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1; // Reset to first page when changing items per page
    },
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
    },
    
    // Reset all filters
    resetFilters: (state) => {
      return { 
        ...initialState, 
        categories: state.categories, // Keep categories loaded from API
        sortOptions: state.sortOptions, // Keep sort options
      };
    },
    
    // Loading and error states
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Action creators
export const {
  setPriceRange,
  applyPriceRange,
  resetPriceRange,
  setCategories,
  setSelectedCategory,
  setRating,
  setSortBy,
  setSearchQuery,
  setSearchSuggestions,
  clearSearch,
  toggleInStockOnly,
  toggleOnSaleOnly,
  setCurrentPage,
  setItemsPerPage,
  setTotalItems,
  resetFilters,
  setLoading,
  setError,
} = filterSlice.actions;

// Selectors
export const selectFilters = (state) => state.filters;

export const selectFilteredProducts = createSelector(
  [
    (state) => state.products.products, // All products
    (state) => state.filters, // All filters
  ],
  (products, filters) => {
    if (!products || products.length === 0) return [];
    
    return products.filter((product) => {
      // Filter by price range
      const price = product.price || 0;
      const isInPriceRange = 
        price >= filters.priceRange.appliedMin && 
        price <= filters.priceRange.appliedMax;
      
      // Filter by category
      const matchesCategory = 
        !filters.selectedCategory || 
        product.category === filters.selectedCategory;
      
      // Filter by rating
      const matchesRating = 
        !filters.rating || 
        Math.floor(product.ratingsAverage || 0) >= filters.rating;
      
      // Filter by search query
      const matchesSearch = 
        !filters.searchQuery ||
        product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.searchQuery.toLowerCase());
      
      // Filter by stock status
      const matchesStock = !filters.inStockOnly || product.countInStock > 0;
      
      // Filter by sale status
      const matchesSale = !filters.onSaleOnly || product.onSale;
      
      return (
        isInPriceRange &&
        matchesCategory &&
        matchesRating &&
        matchesSearch &&
        matchesStock &&
        matchesSale
      );
    }).sort((a, b) => {
      // Apply sorting
      switch (filters.sortBy) {
        case 'price-asc':
          return (a.price || 0) - (b.price || 0);
        case 'price-desc':
          return (b.price || 0) - (a.price || 0);
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'rating':
          return (b.ratingsAverage || 0) - (a.ratingsAverage || 0);
        case 'featured':
        default:
          // Featured products first, then by creation date
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
  }
);

// Pagination selectors
export const selectPaginatedProducts = createSelector(
  [
    selectFilteredProducts,
    (state) => state.filters.currentPage,
    (state) => state.filters.itemsPerPage,
  ],
  (filteredProducts, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }
);

export const selectTotalPages = createSelector(
  [
    selectFilteredProducts,
    (state) => state.filters.itemsPerPage,
  ],
  (filteredProducts, itemsPerPage) => {
    return Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  }
);

export default filterSlice.reducer;
