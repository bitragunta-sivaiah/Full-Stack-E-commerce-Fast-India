
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddAddress from '../components/AddAddress'
// import { MdDelete } from "react-icons/md";
// import { MdEdit } from "react-icons/md";
import EditAddressDetails from '../components/EditAddressDetails';
import Axios from '../utils/Axios';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { useGlobalContext } from '../provider/GlobalProvider';
import Api from '../common/api';
 

const AddressBook = () => {
  const addressList = useSelector(state => state.addresses.addressList)
  const [openAddress,setOpenAddress] = useState(false)
  const [OpenEdit,setOpenEdit] = useState(false)
  const [editData,setEditData] = useState({})
  const { fetchAddress} = useGlobalContext()

  const handleDisableAddress = async(id)=>{
    try {
      const response = await Axios({
        ...Api.disableAddress,
        data : {
          _id : id
        }
      })
      if(response.data.success){
        toast.success("Address Remove")
        if(fetchAddress){
          fetchAddress()
        }
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <div className='mx-auto w-full bg-slate-100   mt-6 p-3'>
        <div className=' bg-white  px-2 py-2 flex  justify-between gap-4 items-center mx-auto rounded-lg '>
            <h2 className='font-semibold text-ellipsis text-xl line-clamp-1 bg-white rounded-lg my-2'>Address</h2>
            <button onClick={()=>setOpenAddress(true)} className='px-3 py-2 border-2 border-green-500 rounded-lg text-green-500 font-semibold'>
                Add Address
            </button>
        </div>
        <div className='bg-slate-100  rounded-lg p-2 grid gap-4 w-full mt-3'>
              {
                addressList.map((address,index)=>{
                  return(
                      <div key={index} className={`border   p-3 rounded-lg flex gap-3 bg-white ${!address.status && 'hidden'}`}>
                          <div className='w-full'>
                            <p>{address.address_line}</p>
                            <p>{address.city}</p>
                            <p>{address.state}</p>
                            <p>{address.country} - {address.pincode}</p>
                            <p>{address.mobile}</p>
                          </div>
                          <div className=' grid gap-10'>
                            <button onClick={()=>{
                              setOpenEdit(true)
                              setEditData(address)
                            }} className=' font-medium p-1 rounded bg-green-100 text-green-600'>
                              Edit
                            </button>
                            <button onClick={()=>
                              handleDisableAddress(address._id)
                            } className='font-medium p-1 rounded bg-red-100 text-red-600'>
                               Delete
                            </button>
                          </div>
                      </div>
                  )
                })
              }
              <div onClick={()=>setOpenAddress(true)} className='h-16 bg-white/70 text-green-800 font-semibold rounded-lg border-2 border-dashed border-green-500 flex justify-center items-center cursor-pointer'>
                Add address
              </div>
        </div>

        {
          openAddress && (
            <AddAddress close={()=>setOpenAddress(false)}/>
          )
        }

        {
          OpenEdit && (
            <EditAddressDetails data={editData} close={()=>setOpenEdit(false)}/>
          )
        }
    </div>
  )
}

export default AddressBook