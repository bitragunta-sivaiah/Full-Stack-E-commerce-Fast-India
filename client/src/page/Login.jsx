import React, { useState, useEffect } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Axios from '../utils/Axios';
import Api from '../common/api';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import fetchUserDetails from '../utils/fetchUseDetails'; // Corrected import
import { setUserDetails } from '../store/useSlice'; // Corrected import
import { useDispatch } from 'react-redux';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const redirectToHome = () => {
        navigate('/');
    }
    const redirectToRegister = () => {
        navigate('/register');
    }

    const [data, setData] = useState({
        emailOrMobile: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        emailOrMobile: '',
        password: ''
    });
    const [touched, setTouched] = useState({
        emailOrMobile: false,
        password: false
    });
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        validateForm(data);
    }, [data]);

    const handleonChange = (event) => {
        const { name, value } = event.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
        validateForm({
            ...data,
            [name]: value
        });
    }

    const handleBlur = (event) => {
        const { name } = event.target;
        setTouched((prev) => ({
            ...prev,
            [name]: true
        }));
        validateForm(data);
    }

    const validateForm = (data) => {
        const { emailOrMobile, password } = data;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^\d{10}$/;

        let emailOrMobileError = '';
        let passwordError = '';

        if (emailOrMobile && !(emailRegex.test(emailOrMobile) || mobileRegex.test(emailOrMobile))) {
            emailOrMobileError = 'Invalid email address or mobile number';
        }

        if (!password) {
            passwordError = 'Password is required';
        }

        setErrors({
            emailOrMobile: emailOrMobileError,
            password: passwordError
        });

        if (!emailOrMobileError && !passwordError) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isButtonDisabled) return;

        try {
            const response = await Axios({
                ...Api.login,
                data: data
            });

            if (response.data.error) {
                toast.error(response.data.message);
            } else if (response.data.success) {
                toast.success(response.data.message);
                localStorage.setItem('accessToken', response.data.data.accessToken);
                localStorage.setItem('refreshToken', response.data.data.refreshToken);
                const userDetails = await fetchUserDetails();
                dispatch(setUserDetails(userDetails.data)); // Corrected dispatch
                setData({ emailOrMobile: '', password: '' });
                navigate("/");
            }

        } catch (error) {
            AxiosToastError(error);
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white p-8 rounded-[32px] md:w-[600px] shadow-lg w-full relative">
                <div onClick={redirectToHome} className="flex items-center mb-4 cursor-pointer">
                    <FaArrowLeftLong size={24} className="text-primary-orange" />
                </div>
                <h2 className="text-3xl font-bold text-primary-blue mb-4 font-poppins text-center">India's last minute app</h2>
                <p className="text-text-gray mb-6 text-center text-xl font-semibold">Log in or Sign up</p>
                <form className='w-full' onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center mb-4 w-[330px] justify-center mx-auto">
                        <div className="flex items-center border border-slate-300 w-full px-2 rounded-[13px] h-[50px]">
                            <input
                                type="text"
                                name="emailOrMobile"
                                value={data.emailOrMobile}
                                id="emailOrMobile"
                                onChange={handleonChange}
                                onBlur={handleBlur}
                                placeholder="Enter email or mobile number"
                                className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                            />
                        </div>
                        {touched.emailOrMobile && errors.emailOrMobile && <span className="text-red-500 text-sm mt-1">{errors.emailOrMobile}</span>}
                    </div>
                    <div className="flex flex-col items-center mb-4 w-[330px] justify-center mx-auto">
                        <div className="flex items-center border border-slate-300 w-full px-2 rounded-[13px] h-[50px]">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={data.password}
                                onChange={handleonChange}
                                onBlur={handleBlur}
                                placeholder="Enter Password"
                                className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                            />
                        </div>
                        {touched.password && errors.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>}
                    </div>
                    <button
                        type="submit"
                        className={`flex items-center border border-slate-300 ${isButtonDisabled ? 'bg-gray-300' : 'bg-primary-orange'} text-white mb-4 w-[330px] justify-center mx-auto px-2 rounded-[13px] h-[50px] ${isButtonDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        disabled={isButtonDisabled}
                    >
                        Continue
                    </button>
                </form>
                <p className="text-gray-600 text-center text-sm mt-4">By continuing, you agree to our <a href="#" className="text-primary-orange">Terms of service</a> & <a href="#" className="text-primary-orange">Privacy policy</a></p>
                <p className="text-gray-600 text-center text-sm mt-4">Don't have an account? <button onClick={redirectToRegister} className="text-primary-orange">Sign up now</button></p>
            </div>
        </div>
    );
}

export default Login;
