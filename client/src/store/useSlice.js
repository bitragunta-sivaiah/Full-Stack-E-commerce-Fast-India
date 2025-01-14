import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: '',
    name: '',
    email: '',
    mobile: '',
    last_login_date: "",
    status: "",
    address_details: [],
    shopping_cart: [],
    orderHistory: [],
    role: "",
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            return { ...state, ...action.payload };
        },
        updatedAvatar: (state, action) => {
            return {...state, avatar: action.payload };
        },
        logout: () => initialState, // Optional: Add a clearUserDetails reducer to reset the state
    }
});

export const { setUserDetails,logout,updatedAvatar } = userSlice.actions;

export default userSlice.reducer;
