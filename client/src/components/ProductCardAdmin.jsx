import React, { useState } from 'react'
import EditProductAdmin from './EditProductAdmin'
import Axios from '../utils/Axios'
import Api from '../common/api'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { IoClose } from 'react-icons/io5'
const ProductCardAdmin = ({data, fetchProductData}) => {
  const [editOpen,setEditOpen]= useState(false)
  const [openDelete,setOpenDelete] = useState(false)

  const handleDeleteCancel  = ()=>{
      setOpenDelete(false)
  }

  const handleDelete = async()=>{
    try {
      const response = await Axios({
         ...Api.deleteProduct,
        data : {
          _id : data._id
        }
      })

      const { data : responseData } = response

      if(responseData.success){
          toast.success(responseData.message)
          if(fetchProductData){
            fetchProductData()
          }
          setOpenDelete(false)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <div className='w-44 shadow-sm bg-white p-2'>
        <div className="w-full overflow-hidden">
            <img src={data?.image[0]} alt={data?.name} 
            className='w-full h-full object-cover'
            />
        </div>
        <p className='text-ellipsis text-sm line-clamp-1 font-semibold font-poppins'>{data?.name}</p>
        <p className='text-[13px] text-slate-600'>{data?.unit}</p>
        <div className="flex items-center justify-between mt-4">
          <button onClick={()=>setEditOpen(true)} className="px-4 py-1 font-medium  w-fit bg-red-100 text-red-500">Edit</button>
          <button onClick={()=>setOpenDelete(true)}  className="px-2 py-1 font-medium w-fit bg-green-100 text-green-500">Delete</button>
        </div>

        {
          editOpen && (
            <EditProductAdmin fetchProductData={fetchProductData} data={data} close={()=>setEditOpen(false)}/>
          )
        }

        {
          openDelete && (
            <section className='fixed top-0 left-0 right-0 bottom-0 bg-neutral-600 z-50 bg-opacity-70 p-4 flex justify-center items-center '>
                <div className='bg-white p-4 w-full max-w-md rounded-md'>
                    <div className='flex items-center justify-between gap-4'>
                        <h3 className='font-semibold'>Permanent Delete</h3>
                        <button onClick={()=>setOpenDelete(false)}>
                          <IoClose size={25}/>
                        </button>
                    </div>
                    <p className='my-2 text-[#f60001]'>Are you sure want to delete permanent ?</p>
                    <div className='flex justify-end gap-5 py-4'>
                      <button onClick={handleDeleteCancel} className='border px-3 py-1 rounded bg-red-100   text-red-500 hover:bg-red-100'>Cancel</button>
                      <button onClick={handleDelete} className='border px-3 py-1 rounded bg-green-100   text-green-500 hover:bg-green-100'>Delete</button>
                    </div>
                </div>
            </section>
          )
        }
    </div>
  )
}

export default ProductCardAdmin