// API Configuration
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// App Configuration
export const APP_NAME = 'Modern E-Commerce';
export const APP_VERSION = '1.0.0';

// Local Storage Keys
export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';
export const CART_KEY = 'cart';
export const WISHLIST_KEY = 'wishlist';

// Pagination Defaults
export const ITEMS_PER_PAGE = 12;
export const DEFAULT_SORT = 'newest';

// Default Error Message
export const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again later.';

// Form Validation
// Add any form validation constants here

export default {
  API_URL,
  APP_NAME,
  APP_VERSION,
  TOKEN_KEY,
  USER_KEY,
  CART_KEY,
  WISHLIST_KEY,
  ITEMS_PER_PAGE,
  DEFAULT_SORT,
  DEFAULT_ERROR_MESSAGE,
};
