import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../page/Home';
import SearchPage from '../page/SearchPage';
import Login from '../page/Login';
import Register from '../page/Register';
import UserMenuMobile from '../page/UserMenuPage';
import Dashboard from '../layout/Dashboard';
import Profile from '../page/Profile';
import OrderHistory from '../page/OrderHistory';
import AddressBook from '../page/AddressBook';
import Category from '../page/Category';
import SubCategory from '../page/SubCategory';
import UploadProduct from '../page/UploadProduct';
import Product from '../page/ProductAdmin';
import AdminPermision from '../layout/AdminPermision';
import ProductListPage from '../page/ProductListPage';
import ProductDisplayPage from '../page/ProductDisplayPage';
import CartMobile from '../page/CartMobile';
import CheckoutPage from '../page/CheckoutPage';
import Success from '../page/Success';
import Cancel from '../page/Cancel';
import UserStatusPage from '../page/UserStatusPage';
import OnlinePaymentPage from '../page/OnlinePaymentPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'search',
                element: <SearchPage />
            },
            {
                path:'login',
                element:<Login/>
            },{
                path:'register',
                element:<Register/>
            },{
                path:'user',
                element:<UserMenuMobile/>
            },{
                path:'dashboard',
                element:<Dashboard/>,
                children:[
                    {
                        path:'profile',
                        element:<Profile/>
                    },
                    {
                        path:'order-status',
                        element:<UserStatusPage/>
                    },
                    {
                        path:'order',
                        element:<AdminPermision><OrderHistory/></AdminPermision>
                    },
                    {
                        path:'address',
                        element:<AddressBook/>
                    },{
                        path:'category',
                        element:<AdminPermision><Category/></AdminPermision>
                    },{
                        path:'subcategory',
                        element:<AdminPermision><SubCategory/></AdminPermision>
                    },{
                        path:'upload-product',
                        element:<AdminPermision><UploadProduct/></AdminPermision>
                    },{
                        path:'product',
                        element:<AdminPermision><Product/></AdminPermision>
                    }
                ]
            },{
                path:':category',
                children:[
                    {
                        path:':subcategory',
                        element:<ProductListPage/>
                    }
                ]
            },{
                path:'product/:product',
                element:<ProductDisplayPage/>
            },
            {
                path : 'cart',
                element : <CartMobile/>
            },
            {
                path:'checkout',
                element:<CheckoutPage/>
            },{
                path:'success',
                element:<Success/>
            },
            {
                path :'cancel',
                element:<Cancel/>
            },
            {
                path: 'paymen',
                element:<OnlinePaymentPage/>
            }
        ]
    }
]);
