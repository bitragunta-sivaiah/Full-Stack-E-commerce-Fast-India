import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Divider from './Divider';
import Axios from '../utils/Axios';
import Api from '../common/api';
import { logout } from '../store/useSlice';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { FaRegFileAlt } from "react-icons/fa";
import { LuMapPinned } from "react-icons/lu";
import { FaUserAlt } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import isAdmin from '../utils/isAdmin';

const MobileMenu = ({ close }) => {
    const user = useSelector((state) => state?.user);
    const dispatch = useDispatch();
    
    const handleLogout = async () => {
        try {
            const response = await Axios({ ...Api.logout });
            if (response.data.success) {
                close();
                dispatch(logout());
                localStorage.clear();
                toast.success(response.data.message);
            } else {
                console.error("Logout failed:", response.data.me);
            }
        } catch (error) {
            AxiosToastError(error);
            console.error("Logout error:", error);
        }
    };
    const handleClose = ()=>{
        if(close){
          close()
        }
     }
    return (
        <div>
            <div className="font-bold text-2xl lg:hidden">My Account</div>
            <div className="text-sm">{user.name || user.mobile}</div>
            <Divider />
            <span className='text-start text-text-gray text-sm'>Your Information</span>
            <div className="text-xl grid gap-8 text-text-gray items-center justify-start mt-7">
            {
                isAdmin(user.role)&&(
                    <Link onClick={handleClose} to={"/dashboard/category"} className='px-2   py-1'>Category</Link>
                )
            }
             {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/subcategory"} className='px-2   py-1'>Sub Category</Link>
              )
            }

            {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/upload-product"} className='px-2   py-1'>Upload Product</Link>
              )
            }

            {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/product"} className='px-2   py-1'>Product</Link>
              )
            }

            {
              isAdmin(user.role) && (
                <Link to={'/dashboard/order'} className='px-2 flex items-center justify-start gap-6'>
                <div className="">
                    <FaRegFileAlt size={25}/>
                </div>
                <div>Orders History</div>
            </Link>
              )
            }
                
                <Link to={'/dashboard/address'} className='px-2 flex items-center justify-start gap-6'>
                    <div><LuMapPinned size={25}/></div>
                    <div>Address Book</div>
                </Link>
                <Link to={'/dashboard/profile'} className='px-2 flex items-center justify-start gap-6'>
                    <div><FaUserAlt size={25} /></div>
                    <div>User Profile</div>
                </Link>
                {/* <Link to={'/order-status'} >
                <div className="">
                        <FaRegFileAlt size={25}/>
                    </div>
                    <div>Orders statis</div>
                </Link> */}
                <button onClick={handleLogout} className='text-left pl-2 flex items-center justify-start gap-6'>
                    <div><FaRegCircleUser size={30}/></div>
                    <div>Logout</div>
                </button>
            </div>
        </div>
    );
};

export default MobileMenu;
