import React, { useEffect, useState } from 'react';
import UploadSubCategoryModel from '../components/UploadSubCategoryModel';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import Api from '../Api/Api';
import toast from 'react-hot-toast';
import DisplayTable from '../components/DisplayTable';
import { createColumnHelper } from '@tanstack/react-table';
import ViewImage from '../components/ViewImage';
import EditSubCategory from '../components/EditSubCategory';
import ConfirmBox from '../components/CofirmBox';

const SubCategory = () => {
  const [openUploadSubCategory, setOpenUploadSubCategory] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columnHelper = createColumnHelper();
  const [imageURL, setImageURL] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteCategoryId, setDeleteCategoryId] = useState({
    _id: ''
  });
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);

  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios(Api.getSubCategory);
      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
        toast.success(responseData.message);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async () => {
    if (!deleteCategoryId._id) {
      toast.error('Invalid category ID');
      return; // Prevent the delete action if the ID is empty
    }

    try {
      const response = await Axios({
        ...Api.deleteSubCategory,
        data: deleteCategoryId,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchSubCategory();
        setDeleteCategoryId({ _id: '' });
        setOpenConfirmBoxDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchSubCategory();
  }, []);

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
    }),
    columnHelper.accessor('image', {
      header: 'Image',
      cell: (info) => {
        const { original } = info.row;
        return (
          <div className="cursor-pointer flex items-center justify-center w-14 h-14 overflow-hidden">
            <img
              src={original.image}
              alt={original.name}
              onClick={() => setImageURL(original.image)}
              className="w-full h-full object-contain"
            />
          </div>
        );
      },
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: (info) => {
        const { original } = info.row;
        return original.category.map((cat) => cat.name).join(', ');
      },
    }),
    columnHelper.accessor('_id', {
      header: 'Action',
      cell: ({ row }) => {
        return (
          <div className="flex justify-center items-center gap-2 flex-wrap">
            <button
              onClick={() => {
                setEditData(row.original); // Set the row data for editing
                setOpenEdit(true); // Open the modal
              }}
              className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => {
                setDeleteCategoryId({ _id: row.original._id }); // Set the correct _id for deletion
                setOpenConfirmBoxDelete(true);
              }}
              className="flex-1 px-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded"
            >
              Delete
            </button>
          </div>
        );
      },
    }),
  ];

  return (
    <section className="">
      <div className="p-2 font-semibold bg-white flex items-center justify-between">
        <h2 className="font-rubik text-xl">SubCategory</h2>
        <button
          onClick={() => setOpenUploadSubCategory(true)}
          className="lg:text-[20px] font-medium font-rubik text-white bg-primary-orange px-3 py-2 lg:py-3 lg:px-4 text-sm"
        >
          Add SubCategory
        </button>
      </div>

      <div>
        <DisplayTable data={data} columns={columns} />
      </div>

      {openUploadSubCategory && (
        <UploadSubCategoryModel close={() => setOpenUploadSubCategory(false)}
        fetchData={fetchSubCategory}    
    />
      )}

      {imageURL && <ViewImage url={imageURL} close={() => setImageURL('')} />}

      {openEdit && editData && (
        <EditSubCategory
          close={() => setOpenEdit(false)}
          fetchSubCategory={fetchSubCategory}
          editData={editData}
        />
      )}

      {openConfirmBoxDelete && (
        <ConfirmBox
          close={() => setOpenConfirmBoxDelete(false)}
          cancel={() => setOpenConfirmBoxDelete(false)}
          confirm={() => handleDeleteCategory()}
        />
      )}
    </section>
  );
};

export default SubCategory;
