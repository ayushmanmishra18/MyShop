import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: false,
  cartOpen: false,
  searchOpen: false,
  loading: false,
  notifications: [],
  theme: 'light',
  isAdminSidebarOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
    toggleCart: (state) => {
      state.cartOpen = !state.cartOpen;
    },
    closeCart: (state) => {
      state.cartOpen = false;
    },
    toggleSearch: (state) => {
      state.searchOpen = !state.searchOpen;
    },
    closeSearch: (state) => {
      state.searchOpen = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleAdminSidebar: (state) => {
      state.isAdminSidebarOpen = !state.isAdminSidebarOpen;
    },
    closeAdminSidebar: (state) => {
      state.isAdminSidebarOpen = false;
    },
    openAdminSidebar: (state) => {
      state.isAdminSidebarOpen = true;
    },
  },
});

export const {
  toggleSidebar,
  closeSidebar,
  toggleCart,
  closeCart,
  toggleSearch,
  closeSearch,
  setLoading,
  addNotification,
  removeNotification,
  clearNotifications,
  toggleTheme,
  setTheme,
  toggleAdminSidebar,
  closeAdminSidebar,
  openAdminSidebar,
} = uiSlice.actions;

export const selectUi = (state) => state.ui;

export default uiSlice.reducer;