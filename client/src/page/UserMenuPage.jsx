import React from 'react';
import { IoClose } from "react-icons/io5";
import MobileMenu from '../components/MobileMenu';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserMenuMobile = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const handleMobileUser = () => {
        if (!user._id) {
            navigate('/login');
            return;
        }
        navigate('/');
    };

    return (
        <section className='bg-white h-full w-full py-2 fixed inset-0 overflow-hidden'>
            <button onClick={() => window.history.back()} className='text-neutral-800 block w-fit ml-auto'>
                <IoClose size={25}/>
            </button>
            <div className='container mx-auto px-3 pb-8 h-full'>
                <div className="w-full h-full mt-32 flex items-start justify-start">
                    <MobileMenu close={handleMobileUser}/>
                </div>
                {/* <div className="absolute bottom-0 left-0 w-full bg-primary-blue text-white p-4 flex justify-between items-center">
                    <div>
                        <p>1 item</p>
                        <p>Total Price: ₹37</p>
                    </div>
                    <button className="bg-white text-primary-blue px-4 py-2 rounded">View Cart</button>
                </div> */}
            </div>
        </section>
    );
};

export default UserMenuMobile;
