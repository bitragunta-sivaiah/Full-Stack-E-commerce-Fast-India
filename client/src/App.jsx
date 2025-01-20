import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import './App.css';
import fetchUserDetails from './utils/fetchUseDetails'; // Corrected import name
import { setUserDetails } from './store/useSlice'; // Corrected import name
import { useDispatch } from 'react-redux';
import Axios from './utils/Axios';
import Api from './common/Api';
import {  setAllCategory,setAllSubCategory,setLoadingCategory } from './store/productSlice';
import AxiosToastError from './utils/AxiosToastError';
import { handleAddItemCart } from './store/cartProduct'
import GlobalProvider from './provider/GlobalProvider';

const App = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const userData = await fetchUserDetails();
            if (userData) {
                dispatch(setUserDetails(userData));
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategory = async () => {
        try {
            dispatch(setLoadingCategory(true));
            const response = await Axios({
                ...Api.getCategory
            });
            const { data: responseData } = response;
            if (responseData.success) {
                // console.log(responseData.data);
                dispatch(setAllCategory(responseData.data));
            }
        } catch (error) {
            console.error('Error fetching category:', error);
        }finally{
            dispatch(setLoadingCategory(false));
        }
    };

    const fetchSubCategory = async () => {
        try {
            const response = await Axios({
                ...Api.getSubCategory
            });
            const { data: responseData } = response;

            if (responseData.success) {
                dispatch(setAllSubCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name))));
            }
        } catch (error) {
            console.error('Error fetching subcategory:', error);
        }
    };

    const fetchCartItem = async ()=>{
        try {
            const response = await Axios({
                ...Api.getCartItem
            })
            const {data: responseData} = response;
            if(responseData.success){
                dispatch(handleAddItemCart(responseData.data));
                // console.log(responseData.data);
            }
        } catch (error) {
            AxiosToastError(error);
            console.log(error);
        }
    }
    useEffect(() => {
        fetchUser();
        fetchCategory();
        fetchSubCategory();
        fetchCartItem();
    }, []);

    return (
        <GlobalProvider>
            <Header loading={loading} />
            <main>
                <Outlet />
            </main>
            <Footer />
            <Toaster />
        </GlobalProvider>
    );
};

export default App;
