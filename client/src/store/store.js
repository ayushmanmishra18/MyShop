import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import uiReducer from './slices/uiSlice';
import addressReducer from './slices/addressSlice';
import reviewReducer from './slices/reviewSlice';
import filterReducer from './slices/filterSlice';
import searchReducer from './slices/searchSlice';

// Persist configuration for auth and cart
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token'],
};

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['items', 'shippingAddress', 'paymentMethod'],
};

// Create persisted reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

// Create store
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    products: productReducer,
    cart: persistedCartReducer,
    orders: orderReducer,
    ui: uiReducer,
    addresses: addressReducer,
    reviews: reviewReducer,
    filters: filterReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
      immutableCheck: {
        // Optional: You can ignore specific paths if needed
        // ignoredPaths: ['some.nested.path'],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);

export default { store, persistor };