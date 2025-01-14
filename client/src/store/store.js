import { configureStore } from '@reduxjs/toolkit';
import userReducer from './useSlice'; // Corrected the import name
import productReducer from '../store/productSlice'
import cartReducer from '../store/cartProduct'
import addressReducer from './addressSlice'
import orderReducer from './orderSlice'
export const store = configureStore({
    reducer: {
        user: userReducer,
        // product Slice
        product:productReducer,
        cartItem : cartReducer,
        addresses : addressReducer,
        orders : orderReducer
    },
});
