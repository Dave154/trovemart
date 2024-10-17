import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../Slices/products.js';
import appbarReducer from '../Slices/appbar.js';
import searchReducer from '../Slices/search.js';
import cartReducer from '../Slices/cart.js';
export const store = configureStore({
  reducer: {
    products: productsReducer,
    appbar: appbarReducer,
    search: searchReducer,
    cart:cartReducer,
  },
});