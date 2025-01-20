import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import Axios from '../utils/Axios';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import Api from '../Api/Api';

const EditCategory = ({ close, fetchData, data: CategoryData }) => {
    const [data, setData] = useState({
        _id: CategoryData._id,
        name: CategoryData.name,
        image: CategoryData.image,
    });
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await Axios({
                ...Api.updateCategory,
                data: data,
            });
            const { data: responseData } = response;

            if (responseData.success) {
                toast.success(responseData.message);
                close();
                fetchData();
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadCategoryImage = async (e) => {
        const file = e.target.files[0];

        if (!file) {
            return;
        }
        setLoading(true);
        const response = await uploadImage(file);
        const { data: ImageResponse } = response;
        setLoading(false);

        setData((prev) => ({
            ...prev,
            image: ImageResponse.data.url,
        }));
    };

    return (
        <section className='fixed inset-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center z-50'>
            <div className='bg-white max-w-4xl w-full p-6 rounded-[32px] shadow-lg transform transition-all'>
                <div className='flex items-center justify-between'>
                    <h1 className='font-bold text-2xl text-primary-600'>Update Category</h1>
                    <button onClick={close} className='w-fit block ml-auto p-2 hover:bg-gray-200 rounded-full'>
                        <IoClose size={25} />
                    </button>
                </div>
                <form className='mt-8 grid gap-6' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label id='categoryName' className='font-semibold text-gray-600'>Name</label>
                        <input
                            type='text'
                            id='categoryName'
                            placeholder='Enter category name'
                            value={data.name}
                            name='name'
                            onChange={handleOnChange}
                            className='bg-gray-50 p-3 border border-gray-200 focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none rounded-lg'
                        />
                    </div>
                    <div className='grid gap-1'>
                        <p className='font-semibold text-gray-600'>Image</p>
                        <div className='flex gap-4 flex-col lg:flex-row items-center'>
                            <div className='border bg-gray-50 h-36 w-full lg:w-36 flex items-center justify-center rounded-lg overflow-hidden'>
                                {data.image ? (
                                    <img
                                        alt='category'
                                        src={data.image}
                                        className='w-full h-full object-cover'
                                    />
                                ) : (
                                    <p className='text-sm text-gray-500'>No Image</p>
                                )}
                            </div>
                            <label htmlFor='uploadCategoryImage' className='flex flex-col items-center'>
                                <div className={`${!data.name ? "bg-gray-300 cursor-not-allowed" : "bg-primary-600 hover:bg-primary-500 cursor-pointer"} px-6 py-3 rounded-lg text-white font-semibold transition-all`}>
                                    {loading ? "Loading..." : "Upload Image"}
                                </div>
                                <input disabled={!data.name} onChange={handleUploadCategoryImage} type='file' id='uploadCategoryImage' className='hidden' />
                            </label>
                        </div>
                    </div>
                    <button
                        className={`${data.name && data.image ? "bg-primary-600 bg-primary-orange" : "bg-gray-300 cursor-not-allowed"} py-3 font-bold text-white  transition-all`}
                        disabled={!data.name || !data.image}
                    >
                        Update Category
                    </button>
                </form>
            </div>
        </section>
    );
};

export default EditCategory;
