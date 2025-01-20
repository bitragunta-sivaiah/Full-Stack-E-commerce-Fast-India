import React, { useState, useEffect } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Axios from '../utils/Axios';
import Api from '../Api/Api';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const Register = () => {
    const navigate = useNavigate();

    const redirectToHome = () => {
        navigate('/');
    }
    const redirectToLogin = () => {
        navigate('/login');
    }

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        mobile: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        mobile: ''
    });
    const [touched, setTouched] = useState({
        name: false,
        email: false,
        password: false,
        mobile: false
    });
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        validateForm(data);
    }, [data]);

    const handleOnChange = (event) => {
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
        const { name, email, password, mobile } = data;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^\d{10}$/;

        let nameError = '';
        let emailError = '';
        let passwordError = '';
        let mobileError = '';

        if (!name) {
            nameError = 'Name is required';
        }

        if (email && !emailRegex.test(email)) {
            emailError = 'Invalid email address';
        }

        if (!password) {
            passwordError = 'Password is required';
        }

        if (mobile && !mobileRegex.test(mobile)) {
            mobileError = 'Invalid mobile number';
        }

        setErrors({
            name: nameError,
            email: emailError,
            password: passwordError,
            mobile: mobileError
        });

        if (!nameError && !emailError && !passwordError && !mobileError) {
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
                ...Api.register,
                data: data
            });

            if (response.status === 400) {
                toast.error(response.data.message);
            } else if (response.status === 201) {
                toast.success(response.data.message);
                setData({ name: '', email: '', password: '', mobile: '' });
                setTouched({ name: false, email: false, password: false, mobile: false });
                navigate("/login");
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
                <p className="text-text-gray mb-6 text-center text-xl font-semibold">Sign up</p>
                <form className='w-full' onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center mb-4 w-[330px] justify-center mx-auto">
                        <div className="flex items-center border border-slate-300 w-full px-2 rounded-[13px] h-[50px]">
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                id="name"
                                onChange={handleOnChange}
                                onBlur={handleBlur}
                                placeholder="Enter your name"
                                className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                            />
                        </div>
                        {touched.name && errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
                    </div>
                    <div className="flex flex-col items-center mb-4 w-[330px] justify-center mx-auto">
                        <div className="flex items-center border border-slate-300 w-full px-2 rounded-[13px] h-[50px]">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={data.email}
                                onChange={handleOnChange}
                                onBlur={handleBlur}
                                placeholder="Enter email address"
                                className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                            />
                        </div>
                        {touched.email && errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
                    </div>
                    <div className="flex flex-col items-center mb-4 w-[330px] justify-center mx-auto">
                        <div className="flex items-center border border-slate-300 w-full px-2 rounded-[13px] h-[50px]">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={data.password}
                                onChange={handleOnChange}
                                onBlur={handleBlur}
                                placeholder="Enter password"
                                className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                            />
                        </div>
                        {touched.password && errors.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>}
                    </div>
                    <div className="flex flex-col items-center mb-4 w-[330px] justify-center mx-auto">
                        <div className="flex items-center border border-slate-300 w-full px-2 rounded-[13px] h-[50px]">
                            <input
                                type="text"
                                name="mobile"
                                id="mobile"
                                value={data.mobile}
                                onChange={handleOnChange}
                                onBlur={handleBlur}
                                placeholder="Enter mobile number"
                                className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                            />
                        </div>
                        {touched.mobile && errors.mobile && <span className="text-red-500 text-sm mt-1">{errors.mobile}</span>}
                    </div>
                    <button
                        type="submit"
                        className={`flex items-center border border-slate-300 ${isButtonDisabled ? 'bg-gray-300' : 'bg-primary-orange'} text-white mb-4 w-[330px] justify-center mx-auto px-2 rounded-[13px] h-[50px] ${isButtonDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        disabled={isButtonDisabled}
                    >
                        Register
                    </button>
                </form>
                <p className="text-gray-600 text-center text-sm mt-4">By continuing, you agree to our <a href="#" className="text-primary-orange">Terms of service</a> & <a href="#" className="text-primary-orange">Privacy policy</a></p>
                <p className="text-gray-600 text-center text-sm mt-4">Already have an account? <button onClick={redirectToLogin} className="text-primary-orange">Log in now</button></p>
            </div>
        </div>
    );
}

export default Register;
