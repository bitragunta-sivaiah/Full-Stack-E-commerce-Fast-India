import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Divider from './Divider';
import Axios from '../utils/Axios';
import Api from '../common/api';
import { logout } from '../store/useSlice';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from '../utils/isAdmin';
import { FaRegFileAlt } from 'react-icons/fa';

const UserMenu = ({ close }) => {
    const user = useSelector((state) => state?.user);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const response = await Axios({
                ...Api.logout
            });
            if (response.data.success) {
                close();
                dispatch(logout());
                localStorage.clear();
                toast.success(response.data.message);
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    const handleClose = () => {
        if (close) {
            close();
        }
    };

    return (
        <div>
            <div className="font-bold text-2xl hidden lg:block">My Account</div>
            <div className="text-sm flex items-center gap-2 text-primary-orange">
                {user.name || user.mobile}
                <Link to={'/dashboard/profile'} onClick={handleClose}>
                    <HiOutlineExternalLink />
                </Link>
            </div>
            <Divider />
            <div className="text-xl grid gap-4 text-text-gray items-center justify-start">
                {isAdmin(user.role) && (
                    <Link onClick={handleClose} to={"/dashboard/category"} className="px-2   py-1">Category</Link>
                )}
                {isAdmin(user.role) && (
                    <Link onClick={handleClose} to={"/dashboard/subcategory"} className="px-2   py-1">Sub Category</Link>
                )}
                {isAdmin(user.role) && (
                    <Link onClick={handleClose} to={"/dashboard/upload-product"} className="px-2   py-1">Upload Product</Link>
                )}
                {isAdmin(user.role) && (
                    <Link onClick={handleClose} to={"/dashboard/product"} className="px-2   py-1">Product</Link>
                )}

{
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={'/dashboard/order'} className='px-2 flex items-center justify-start gap-6'>
                 
                <div>Orders History</div>
            </Link>
              )
            }
                {/* <Link onClick={handleClose} to={'/dashboard/order'} className='px-2'>Orders History</Link> */}
                <Link onClick={handleClose} to={'/dashboard/profile'} className='px-2'>Profile</Link>
                <Link onClick={handleClose} to={'/dashboard/address'} className='px-2'>Address Booking</Link>
                <Link onClick={handleClose} to={'/dashboard/order-status'} className='px-2'>Order Status</Link>
                <button onClick={handleLogout} className='text-left pl-2'>Logout</button>
            </div>
        </div>
    );
};

export default UserMenu;
