import React, { useState } from 'react';
import { BsCloudUpload } from "react-icons/bs";
import uploadImage from '../utils/UploadImage';
import ViewImage from '../components/ViewImage';
import { IoClose } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import AddFieldComponent from '../components/AddFieldComponent';
import Axios from '../utils/Axios';
import Api from '../Api/Api';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import successAlert from '../utils/SuccessAlert';

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [], // Ensure this is an array
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  });
  const allCategory = useSelector(state => state.product.allCategory);
  const allSubCategory = useSelector(state => state.product.allSubCategory)
  const [imageLoading, setImageLoading] = useState(false);
  const [ViewImageURL, setViewImageURL] = useState("");
  const [selectCategory, setSelectCategory] = useState([]);
  const [selectSubCategory, setSelectSubCategory] = useState("");

  const [moreFields, setMoreFields] = useState([]);
  const [openAddButtonField, setOpenAddButtonField] = useState(false)
  const [fieldName, setFieldName] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev, [name]: value
    }));
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setImageLoading(true);
    try {
      const response = await uploadImage(file);
      const { data: ImageResponse } = response;

      setData(prev => ({
        ...prev,
        // Add the new image to the array
        image: [...prev.image, ImageResponse.data.url],
      }));
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setImageLoading(false);
    }
  };

  const handleCategorySelection = (e) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = allCategory.find(el => el._id === selectedCategoryId);

    if (selectedCategory) {
      setSelectCategory(prev => [...prev, selectedCategory]);
      setData(prev => ({
        ...prev,
        category: [...prev.category, selectedCategory]
      }));
    }
  };

  const handleRemoveCategory = (categoryId) => {
    setSelectCategory(prev => prev.filter(cat => cat._id !== categoryId));
    setData(prev => ({
      ...prev,
      category: prev.category.filter(cat => cat._id !== categoryId)
    }));
  };

  const handleRemoveSubCategory = async (index) => {
    data.subCategory.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })
  }

  const handleAddField = () => {
    setData((preve) => {
      return {
        ...preve,
        more_details: {
          ...preve.more_details,
          [fieldName]: ""
        }
      }
    })
    setFieldName("")
    setOpenAddButtonField(false)
  }

  const handleRemoveField = (key) => {
    if (window.confirm(`Are you sure you want to remove the field "${key}"?`)) {
      setData(prev => {
        const updatedDetails = { ...prev.more_details };
        delete updatedDetails[key];
        return { ...prev, more_details: updatedDetails };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    try {
      const response = await Axios({
        ...Api.createProduct,
        data
      })
      const { data: responseData } = response;
      if (responseData.success) {
        successAlert(responseData.message);
        toast.success(responseData.message);
        setData({
          name: "",
          image: [], // Ensure this is an array
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        })
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <section className="max-w-3xl mx-auto p-5">
      <div className="p-5 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-primary-orange">Upload Product</h2>
           
        </div>

        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-5">
            <label htmlFor="name" className="block text-gray-600 font-medium mb-2">Product Name</label>
            <input
              type="text"
              required
              id="name"
              name="name"
              placeholder="Enter product name"
              value={data.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-orange transition duration-300"
            />
          </div>

          {/* Product Description */}
          <div className="mb-5">
            <label htmlFor="description" className="block text-gray-600 font-medium mb-2">Description</label>
            <textarea
              rows={4}
              id="description"
              name="description"
              placeholder="Enter product description"
              value={data.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-orange transition duration-300"
            />
          </div>
          {/* Image Upload Section */}
          <div className="mb-5">
            <p className="font-medium text-gray-600">Product Image</p>
            <div className="bg-gray-50 h-40 flex justify-center items-center border border-dashed border-gray-300 rounded-lg mt-3">
              <label
                htmlFor="upload"
                className="flex flex-col items-center justify-center cursor-pointer text-gray-600"
              >
                <BsCloudUpload size={40} />
                <p className="mt-2">Upload Image</p>
              </label>
              <input
                type="file"
                name="image"
                id="upload"
                accept="image/*"
                onChange={handleUploadImage}
                className="hidden"
              />
            </div>
            {imageLoading && (
              <div className="mt-3 text-center text-gray-600">Uploading image...</div>
            )}
            {/* Display uploaded images */}
            <div className="mt-5 flex gap-4">
              {data.image.length > 0 && data.image.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Uploaded ${index}`}
                    onClick={() => setViewImageURL(image)}
                    className="w-20 h-20 object-cover rounded-lg shadow-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setData(prev => ({ ...prev, image: prev.image.filter((_, i) => i !== index) }))}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md hover:bg-red-600 transition duration-300"
                  >
                    <IoClose size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* Category Selection */}
          <div className="mb-5">
            <label htmlFor="category" className="block text-gray-600 font-medium mb-2">Category</label>
            <div className="border border-gray-300 rounded-md p-2 bg-white shadow-inner">
              {/* Display selected categories */}
              <div className="flex items-center flex-wrap gap-2 mb-3">
                {selectCategory.map(cat => (
                  <div key={cat._id} className="bg-gray-200 flex items-center gap-2 h-8 shadow-sm px-2 py-1 rounded-md">
                    {cat.name}
                    <div className="cursor-pointer" onClick={() => handleRemoveCategory(cat._id)}>
                      <IoClose size={16} className="text-gray-600 hover:text-gray-800" />
                    </div>
                  </div>
                ))}
              </div>
              {/* Select category */}
              <select
                name="category"
                id="category"
                onChange={handleCategorySelection}
                className="w-full p-2 bg-transparent outline-none border-none focus:ring-0"
              >
                <option value="" disabled>Select Category</option>
                {[...allCategory].sort((a, b) => a.name.localeCompare(b.name)).map(category => (
                  <option value={category._id} key={category._id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
          {/* Subcategory Selection */}
          <div className="mb-5">
            <label htmlFor="subCategory" className="block text-gray-600 font-medium mb-2">Sub Category</label>
            <div className="border border-gray-300 rounded-md p-2 bg-white shadow-inner">
              {/* Display selected subcategories */}
              <div className="flex items-center flex-wrap gap-2 mb-3">
                {data.subCategory.map((c, index) => (
                  <div key={c._id + index + "productsection"} className="bg-gray-200 flex items-center gap-2 h-8 shadow-sm px-2 py-1 rounded-md">
                    {c.name}
                    <div className="cursor-pointer" onClick={() => handleRemoveSubCategory(index)}>
                      <IoClose size={16} className="text-gray-600 hover:text-gray-800" />
                    </div>
                  </div>
                ))}
              </div>
              {/* Select subcategory */}
              <select
                name="subCategory"
                id="subCategory"
                onChange={(e) => {
                  const value = e.target.value;
                  const subCategory = allSubCategory.find(el => el._id === value);

                  setData((prev) => ({
                    ...prev,
                    subCategory: [...prev.subCategory, subCategory],
                  }));
                  setSelectSubCategory("");
                }}
                className="w-full p-2 bg-transparent outline-none border-none focus:ring-0"
              >
                <option value={""} disabled>Select Sub Category</option>
                {allSubCategory.map((c) => (
                  <option value={c?._id} key={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
          {/* unit */}
          <div className="mb-5">
            <label htmlFor="unit" className="block text-gray-600 font-medium mb-2">Unit</label>
            <input
              type="text"
              required
              id="unit"
              name="unit"
              placeholder="Enter product unit"
              value={data.unit}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-orange transition duration-300"
            />
          </div>

          {/* stock */}
          <div className="mb-5">
            <label htmlFor="stock" className="block text-gray-600 font-medium mb-2">Stock</label>
            <input
              type="number"
              required
              id="stock"
              name="stock"
              placeholder="Enter Stocks"
              value={data.stock}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-orange transition duration-300"
            />
          </div>
          {/* price */}

          <div className="mb-5">
            <label htmlFor="price" className="block text-gray-600 font-medium mb-2">Price</label>
            <input
              type="number"
              required
              id="price"
              name="price"
              placeholder="Enter product price"
              value={data.price}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-orange transition duration-300"
            />
          </div>
          {/* discount price */}

          <div className="mb-5">
            <label htmlFor="discount" className="block text-gray-600 font-medium mb-2">Discount</label>
            <input
              type="number"
              required
              id="discount"
              name="discount"
              placeholder="Enter product Discount"
              value={data.discount}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-orange transition duration-300"
            />
          </div>
          {/* add more object */}
          <div>
            {
              Object.keys(data.more_details).map((key, index) => (
                <div key={`${key}-${index}`} className='mb-5'>
                  <label htmlFor={key} className="block text-gray-600 font-medium mb-2">{key}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      required
                      id={key}
                      name={key}
                      placeholder={`Enter Product ${key}`}
                      value={data.more_details[key]}
                      onChange={(e) => {
                        const { name, value } = e.target;
                        setData(prev => ({
                          ...prev,
                          more_details: {
                            ...prev.more_details,
                            [name]: value,
                          },
                        }));
                      }}
                      className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-orange transition duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveField(key)}
                      className="flex-1 px-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded transition-all"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            }
          </div>

          {/*  add more feilds */}
          <div onClick={() => setOpenAddButtonField(true)} className='inline-block mb-5 bg-primary-orange px-3 py-2 cursor-pointer text-white text-md font-rubik font-semibold rounded-lg '>
            Add Fields
          </div>


          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-primary-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>

      {ViewImageURL && (
        <ViewImage url={ViewImageURL} close={() => setViewImageURL('')} />
      )}


      {
        openAddButtonField && (
          <AddFieldComponent close={() => setOpenAddButtonField(false)}
            value={fieldName}
            onChange={(e) => {
              setFieldName(e.target.value)
            }}
            submit={handleAddField}
          />
        )
      }
    </section>
  );
};

export default UploadProduct;
