import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import searchService from '../../services/searchService';

// Initial state
const initialState = {
  // Search query
  query: '',
  // Search results
  results: [],
  // Search suggestions
  suggestions: [],
  // Loading states
  loading: false,
  searching: false,
  suggesting: false,
  // Error state
  error: null,
  // Search metadata
  totalResults: 0,
  currentPage: 1,
  itemsPerPage: 12,
  totalPages: 1,
  // Filters
  filters: {
    categories: [],
    priceRange: { min: 0, max: 1000 },
    selectedCategory: null,
    minPrice: 0,
    maxPrice: 1000,
    rating: null,
    inStockOnly: false,
    onSaleOnly: false,
    sortBy: 'featured',
  },
  // UI state
  isFiltersOpen: false,
  showSuggestions: false,
};

// Async thunks
export const searchProducts = createAsyncThunk(
  'search/searchProducts',
  async (params, { getState, rejectWithValue }) => {
    try {
      const { search } = getState();
      const {
        query = search.query,
        page = search.currentPage,
        limit = search.itemsPerPage,
        ...filters
      } = params || {};

      const searchParams = {
        query,
        page,
        limit,
        ...filters,
      };

      const response = await searchService.searchProducts(searchParams);
      return {
        results: response.data.products || [],
        totalResults: response.results || 0,
        currentPage: page,
        itemsPerPage: limit,
        totalPages: Math.ceil(response.results / limit) || 1,
        filters: {
          ...search.filters,
          ...filters,
        },
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to perform search');
    }
  }
);

export const getSearchSuggestions = createAsyncThunk(
  'search/getSearchSuggestions',
  async (query, { rejectWithValue }) => {
    try {
      if (!query || query.trim() === '') {
        return [];
      }
      const suggestions = await searchService.getSearchSuggestions(query);
      return suggestions;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to get suggestions');
    }
  }
);

export const fetchPriceRange = createAsyncThunk(
  'search/fetchPriceRange',
  async (_, { rejectWithValue }) => {
    try {
      const priceRange = await searchService.getPriceRange();
      return priceRange;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch price range');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'search/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const categories = await searchService.getCategories();
      return categories;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch categories');
    }
  }
);

// Create slice
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    // Update search query
    setSearchQuery: (state, action) => {
      state.query = action.payload;
      state.showSuggestions = !!action.payload;
    },
    
    // Toggle filters panel
    toggleFilters: (state) => {
      state.isFiltersOpen = !state.isFiltersOpen;
    },
    
    // Toggle suggestions dropdown
    toggleSuggestions: (state, action) => {
      state.showSuggestions = action.payload ?? !state.showSuggestions;
    },
    
    // Update pagination
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    
    // Update items per page
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1; // Reset to first page when changing items per page
    },
    
    // Reset search state
    resetSearch: () => initialState,
    
    // Update filters
    updateFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
      state.currentPage = 1; // Reset to first page when filters change
    },
    
    // Reset filters to default
    resetFilters: (state) => {
      state.filters = {
        ...initialState.filters,
        categories: state.filters.categories, // Keep categories loaded from API
      };
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    // Search products
    builder
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.searching = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.searching = false;
        state.results = action.payload.results;
        state.totalResults = action.payload.totalResults;
        state.currentPage = action.payload.currentPage;
        state.itemsPerPage = action.payload.itemsPerPage;
        state.totalPages = action.payload.totalPages;
        state.filters = action.payload.filters || state.filters;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.searching = false;
        state.error = action.payload;
        state.results = [];
      });
      
    // Get search suggestions
    builder
      .addCase(getSearchSuggestions.pending, (state) => {
        state.suggesting = true;
        state.error = null;
      })
      .addCase(getSearchSuggestions.fulfilled, (state, action) => {
        state.suggesting = false;
        state.suggestions = action.payload;
      })
      .addCase(getSearchSuggestions.rejected, (state, action) => {
        state.suggesting = false;
        state.suggestions = [];
        state.error = action.payload;
      });
      
    // Fetch price range
    builder
      .addCase(fetchPriceRange.fulfilled, (state, action) => {
        state.filters.priceRange = action.payload;
        state.filters.minPrice = action.payload.min;
        state.filters.maxPrice = action.payload.max;
      });
      
    // Fetch categories
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.filters.categories = action.payload;
      });
  },
});

// Export actions
export const {
  setSearchQuery,
  toggleFilters,
  toggleSuggestions,
  setPage,
  setItemsPerPage,
  resetSearch,
  updateFilters,
  resetFilters,
} = searchSlice.actions;

// Selectors
export const selectSearchResults = (state) => state.search.results;
export const selectSearchQuery = (state) => state.search.query;
export const selectSearchLoading = (state) => state.search.loading;
export const selectSearchError = (state) => state.search.error;
export const selectSearchSuggestions = (state) => state.search.suggestions;
export const selectSuggesting = (state) => state.search.suggesting;
export const selectSearchFilters = (state) => state.search.filters;
export const selectIsFiltersOpen = (state) => state.search.isFiltersOpen;
export const selectShowSuggestions = (state) => state.search.showSuggestions;
export const selectSearchPagination = (state) => ({
  currentPage: state.search.currentPage,
  itemsPerPage: state.search.itemsPerPage,
  totalPages: state.search.totalPages,
  totalResults: state.search.totalResults,
});

export default searchSlice.reducer;
