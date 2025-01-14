import React, { useEffect, useState } from 'react';
import UploadCategoryModel from '../components/UploadCategoryModel';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import Axios from '../utils/Axios';
import Api from '../common/api';
import EditCategory from '../components/EditCategory';
import ConfirmBox from '../components/CofirmBox';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { useSelector, useDispatch } from 'react-redux';
import { setAllCategory } from '../store/productSlice';

const Category = () => {
    const [openUploadCategory, setOpenUploadCategory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState(null);
    const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);

    const allCategory = useSelector(state => state.product.allCategory);
    const dispatch = useDispatch();

    const fetchCategory = async () => {
        try {
            setLoading(true);
            const response = await Axios(Api.getCategory);
            const { data: responseData } = response;
            if (responseData.success) {
                dispatch(setAllCategory(responseData.data));
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    useEffect(() => {
        setCategoryData(allCategory || []);
    }, [allCategory]);

    const handleDeleteCategory = async () => {
        try {
            const response = await Axios({
                ...Api.deleteCategory,
                data: { _id: deleteCategoryId },
            });

            const { data: responseData } = response;

            if (responseData.success) {
                toast.success(responseData.message);
                setCategoryData(prevData => prevData.filter(category => category._id !== deleteCategoryId));
                setOpenConfirmBoxDelete(false);
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <section className=''>
            <div className="p-2 font-semibold bg-white flex items-center justify-between">
                <h2 className='font-rubik text-xl'>Category</h2>
                <button
                    onClick={() => setOpenUploadCategory(true)}
                    className="lg:text-[20px] font-rubik text-white bg-primary-orange px-3 py-2 lg:py-3 lg:px-4 text-sm"
                >
                    Add Category
                </button>
            </div>
            {!categoryData.length && !loading && <NoData />}
            <div className='flex items-center flex-wrap justify-center lg:justify-start gap-3 w-full h-full lg:gap-8'>
                {categoryData.map((category) => (
                    <div className='lg:w-44 w-32 overflow-hidden h-auto mt-10 rounded bg-white ml-2 p-2 shadow-md' key={category._id}>
                       <div className="w-full h-[200px] overflow-hidden">
                       <img alt={category.name} src={category.image} className='w-full h-full object-scale-down' />
                       </div>
                        <div className='items-center h-9 flex gap-2 mt-2'>
                            <button
                                onClick={() => {
                                    setOpenEdit(true);
                                    setEditData(category);
                                }}
                                className='flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded'
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    setOpenConfirmBoxDelete(true);
                                    setDeleteCategoryId(category._id);
                                }}
                                className='flex-1 px-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded'
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {loading && <Loading />}
            {openUploadCategory && <UploadCategoryModel fetchData={fetchCategory} close={() => setOpenUploadCategory(false)} />}
            {openEdit && editData && <EditCategory data={editData} close={() => setOpenEdit(false)} fetchData={fetchCategory} />}
            {openConfirmBoxDelete && (
                <ConfirmBox close={() => setOpenConfirmBoxDelete(false)} cancel={() => setOpenConfirmBoxDelete(false)} confirm={handleDeleteCategory} />
            )}
        </section>
    );
};

export default Category;
