import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import Axios from '../utils/Axios';
import toast from 'react-hot-toast';
import Api from '../common/api';
import AxiosToastError from '../utils/AxiosToastError';

const UploadCategoryModel = ({ close, fetchData }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: '',
        image: '',
    });

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
                ...Api.addCategory,
                data: data
            });
            const { data: responseData } = response;
            if (responseData.success) {
                toast.success(responseData.message);
                fetchData();
                close();
            }
        } catch (error) {
            AxiosToastError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadCategory = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const response = await uploadImage(file);
            const { data: ImageResponse } = response;
            setData((prev) => ({
                ...prev,
                image: ImageResponse.data.url,
            }));
        }
    };

    return (
        <section className='fixed top-0 right-0 bottom-0 flex items-center justify-center bg-black/30 w-[100vw] h-[100vh]'>
            <div className="bg-white max-w-4xl w-full p-4">
                <div className="flex items-center justify-between">
                    <h2 className='font-rubik font-semibold text-xl'>
                        Category
                    </h2>
                    <button className='w-fit block ml-auto' onClick={close}>
                        <IoClose size={30} />
                    </button>
                </div>
                {/* category form */}
                <form action="" className='flex flex-col mt-10 gap-5' onSubmit={handleSubmit}>
                    <div className="flex items-center gap-3">
                        <label htmlFor="categoryName">Name</label>
                        <input type="text"
                            id='categoryName'
                            placeholder='Enter category name'
                            name='name'
                            value={data.name}
                            onChange={handleOnChange}
                            className='h-[40px] w-full px-3 py-2 bg-slate-100 focus-within:outline-none'
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <p>Image</p>
                        <div className="flex gap-4 flex-col lg:flex-row items-center">
                            <div className="bg-bg-light-cream h-36 w-full lg:w-36 flex items-center justify-center">
                                {data.image ? (
                                    <img src={data.image} alt="category" className='w-full h-full object-cover' />
                                ) : (
                                    <p>No image</p>
                                )}
                            </div>
                            <label htmlFor="uploadcategoryImage">
                                <span className={`
                                    ${!data.name ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-orange'} px-4 py-2 text-white
                                `}>Upload Image</span>
                                <input type="file" disabled={!data.name} onChange={data.name ? handleUploadCategory : () => { }} id="uploadcategoryImage" className='hidden' />
                            </label>
                        </div>
                    </div>
                    <button className={`
                        ${data.name && data.image ? 'bg-primary-blue' : 'bg-slate-200'}
                        py-2 font-rubik text-white font-semibold
                    `}>
                        Add Category
                    </button>
                </form>
            </div>
        </section>
    );
};

export default UploadCategoryModel