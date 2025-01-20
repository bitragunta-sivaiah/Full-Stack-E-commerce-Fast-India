import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import uploadImage from '../utils/UploadImage';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import Api from '../Api/Api';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const EditSubCategory = ({ close, editData, fetchSubCategory }) => {
  const allCategory = useSelector((state) => state.product.allCategory);
  const [formData, setFormData] = useState({
    _id: editData?._id || null,
    name: editData?.name || '',
    image: editData?.image || '',
    category: editData?.category || []
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData({
        _id: editData._id || null,
        name: editData.name || '',
        image: editData.image || '',
        category: editData.category || []
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      try {
        const response = await uploadImage(file);
        const { data: ImageResponse } = response;
        setFormData((prev) => ({
          ...prev,
          image: ImageResponse.data.url
        }));
      } catch (error) {
        toast.error('Failed to upload image.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRemoveCategorySelected = (categoryId) => {
    const updatedCategory = formData.category.filter((el) => el._id !== categoryId);
    setFormData((prev) => ({
      ...prev,
      category: updatedCategory
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData._id) {
      toast.error('Invalid SubCategory ID. Please try again.');
      return;
    }

    setLoading(true);
    try {
      const response = await Axios({
        ...Api.updateSubCategory,
        data: formData
      });
      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchSubCategory();
        close();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed top-0 right-0 flex items-center p-4 justify-center bottom-0 left-0 bg-black/50 z-40 w-[100vw] h-[100vh]">
      <div className="w-full max-w-2xl p-4 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-semibold text-2xl text-primary-orange">Edit SubCategory</h1>
          <button onClick={close} className="text-gray-600 hover:text-gray-800">
            <IoClose size={30} />
          </button>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="mt-4">
            <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={formData.name}
              placeholder="Enter subcategory name"
              className="w-full h-12 mt-3 border border-gray-300 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent rounded-md"
            />
          </div>

          <div>
            <p className="font-medium text-gray-700">Image</p>
            <div className="flex gap-3 flex-col lg:flex-row items-center mt-2">
              <div className="bg-slate-300 w-full lg:w-36 h-36 mt-4 flex items-center justify-center rounded-md overflow-hidden shadow-inner">
                {loading ? (
                  <div className="loader"></div>
                ) : formData.image ? (
                  <img src={formData.image} alt={formData.name} className="w-full h-full object-cover" />
                ) : (
                  <p className="font-medium text-gray-500">No image</p>
                )}
              </div>
              <label htmlFor="image">
                <span className="w-full lg:w-36 h-12 flex items-center justify-center bg-primary-orange cursor-pointer text-white rounded-md shadow-md px-2">
                  Upload Image
                </span>
              </label>
              <input
                type="file"
                id="image"
                className="hidden"
                name="image"
                onChange={handleUploadSubCategoryImage}
              />
            </div>
            <div className="mt-4 grid gap-3">
              <label htmlFor="" className="block mb-1 font-medium text-gray-700">Select Category</label>
              <div className="border border-gray-300 rounded-md focus-within:border-primary-orange shadow-inner p-2 bg-white">
                <div className="flex items-center flex-wrap gap-2 mb-3">
                  {formData.category.map((cat) => (
                    <div key={cat._id + 'selected value'} className="bg-gray-200 flex items-center gap-2 h-8 shadow-sm px-2 py-1 rounded-md">
                      {cat.name}
                      <div className="cursor-pointer" onClick={() => handleRemoveCategorySelected(cat._id)}>
                        <IoClose size={16} className="text-gray-600 hover:text-gray-800" />
                      </div>
                    </div>
                  ))}
                </div>
                <select
                  name="category"
                  id="category"
                  onChange={(e) => {
                    const value = e.target.value;
                    const categoryDetails = allCategory.find((el) => el._id === value);
                    setFormData((prev) => ({
                      ...prev,
                      category: [...prev.category, categoryDetails]
                    }));
                  }}
                  className="w-full p-2 bg-transparent outline-none border-none focus:ring-0"
                >
                  <option value="" disabled>Select Category</option>
                  {allCategory.slice().sort((a, b) => a.name.localeCompare(b.name)).map((category) => (
                    <option value={category._id} key={category._id}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className={`${
    formData?.name && formData?.image && formData?.category.length > 0
      ? 'bg-primary-orange cursor-pointer'
      : 'bg-slate-100 cursor-not-allowed'
  } w-full h-12 mt-5 text-white rounded-md shadow-md font-inter`}
                disabled={!formData?.name || !formData?.image || formData?.category.length === 0}
              >
                Update SubCategory
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditSubCategory;
