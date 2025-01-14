import React, { useEffect, useState } from 'react';
import avatar from '../assets/user.png';
import { useDispatch, useSelector } from 'react-redux';
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import { setUserDetails } from '../store/useSlice';
import Api from '../common/api';
import AxiosToastError from '../utils/AxiosToastError';
import fetchUserDetails from '../utils/fetchUseDetails';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const user = useSelector(state => state.user);
    const [openProfileAvatar, setProfileAvatar] = useState(false);
    const [userData, setUserData] = useState({
        name: user.name,
        email: user.email,
        mobile: user.mobile,
    });
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setUserData({
            name: user.name,
            email: user.email,
            mobile: user.mobile,
        });
    }, [user]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await Axios({
                ...Api.updateUserDetails,
                data: userData,
            });
            const { data: responseData } = response;

            if (responseData.success) {
                toast.success(responseData.message);
                const userData = await fetchUserDetails();
                dispatch(setUserDetails(userData.data));
            }
            navigate('/dashboard');
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <div className="flex items-center space-x-4">
                <div className="w-20 h-20 flex items-center overflow-hidden rounded-full border border-gray-200 justify-center">
                    {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full" />
                    ) : (
                        <img src={avatar} alt="Avatar" className="w-full h-full" />
                    )}
                </div>
                <button
                    onClick={() => setProfileAvatar(true)}
                    className="text-sm px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Change Avatar
                </button>
            </div>

            {openProfileAvatar && (
                <UserProfileAvatarEdit close={() => setProfileAvatar(false)} />
            )}

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="mt-1 block w-full px-3 py-2 bg-slate-100 h-[50px] focus-within:outline-none rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={userData.name}
                        name="name"
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        className="mt-1 block w-full px-3 py-2 bg-slate-100 h-[50px] focus-within:outline-none rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={userData.email}
                        name="email"
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                        Mobile
                    </label>
                    <input
                        type="text"
                        id="mobile"
                        placeholder="Enter your mobile"
                        className="mt-1 block w-full px-3  bg-slate-100 h-[50px] focus-within:outline-none  rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={userData.mobile}
                        name="mobile"
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <button
                    className="w-full px-4 py-2 h-[45px] font-inter bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                >
                    {loading ? "Loading..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default Profile;