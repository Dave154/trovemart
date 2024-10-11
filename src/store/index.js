import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../Slices/products.js';
import appbarReducer from '../Slices/appbar.js';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    appbar: appbarReducer,
  },
});