// Get authentication header with JWT token
export const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (user && user.token) {
    return { 'Authorization': `Bearer ${user.token}` };
  } else {
    return {};
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return !!(user && user.token);
};

// Get current user
export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Set user in localStorage
const setUser = (userData) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(userData));
  }
};

// Remove user from localStorage
const removeUser = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
};

// Check if user has required role
export const hasRole = (requiredRole) => {
  const user = getCurrentUser();
  return user && user.role === requiredRole;
};

export default {
  getAuthHeader,
  isAuthenticated,
  getCurrentUser,
  setUser,
  removeUser,
  hasRole
};
