import React from 'react'
import { useForm } from "react-hook-form"
import Axios from '../utils/Axios'
 
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from '../provider/GlobalProvider'
import Api from '../Api/Api'

const EditAddressDetails = ({close, data}) => {
    const { register, handleSubmit,reset } = useForm({
        defaultValues : {
            _id : data._id,
            userId : data.userId,
            address_line :data.address_line,
            city : data.city,
            state : data.state,
            country : data.country,
            pincode : data.pincode,
            mobile : data.mobile 
        }
    })
    const { fetchAddress } = useGlobalContext()

    const onSubmit = async(data)=>{
        try {
            const response = await Axios({
                 ...Api.updateAddress,
                data : {
                    ...data,
                    address_line :data.address_line,
                    city : data.city,
                    state : data.state,
                    country : data.country,
                    pincode : data.pincode,
                    mobile : data.mobile
                }
            })

            const { data : responseData } = response
            
            if(responseData.success){
                toast.success(responseData.message)
                if(close){
                    close()
                    reset()
                    fetchAddress()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
  return (
    <section className='bg-black fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-70 h-screen overflow-auto'>
        <div className='bg-white p-4 w-full max-w-lg mt-8 mx-auto rounded-lg'>
            <div className='flex justify-between items-center gap-4'>
                <h2 className='font-semibold'>Edit Address</h2>
                <button onClick={close} className='hover:text-red-500'>
                    <IoClose  size={25}/>
                </button>
            </div>
            <form className='mt-4 grid gap-4' onSubmit={handleSubmit(onSubmit)}>
                <div className='grid gap-1'>
                    <label htmlFor='addressline' className='font-medium'>Address Line :</label>
                    <input
                        type='text'
                        id='addressline' 
                        className='bg-slate-100 w-full p-2 rounded-lg border-2 mt-2 border-slate-200 focus:outline-none focus:border-green-500'
                        {...register("address_line",{required : true})}
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='city' className='font-medium'>City :</label>
                    <input
                        type='text'
                        id='city' 
                        className='bg-slate-100 w-full p-2 rounded-lg border-2 mt-2 border-slate-200 focus:outline-none focus:border-green-500'
                        {...register("city",{required : true})}
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='state' className='font-medium'>State :</label>
                    <input
                        type='text'
                        id='state' 
                        className='bg-slate-100 w-full p-2 rounded-lg border-2 mt-2 border-slate-200 focus:outline-none focus:border-green-500'
                        {...register("state",{required : true})}
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='pincode' className='font-medium'>Pincode :</label>
                    <input
                        type='text'
                        id='pincode' 
                        className='bg-slate-100 w-full p-2 rounded-lg border-2 mt-2 border-slate-200 focus:outline-none focus:border-green-500'
                        {...register("pincode",{required : true})}
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='country' className='font-medium'>Country :</label>
                    <input
                        type='text'
                        id='country' 
                        className='bg-slate-100 w-full p-2 rounded-lg border-2 mt-2 border-slate-200 focus:outline-none focus:border-green-500'
                        {...register("country",{required : true})}
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='mobile' className='font-medium'>Mobile No. :</label>
                    <input
                        type='text'
                        id='mobile' 
                        className='bg-slate-100 w-full p-2 rounded-lg border-2 mt-2 border-slate-200 focus:outline-none focus:border-green-500'
                        {...register("mobile",{required : true})}
                    />
                </div>

                <button type='submit' className="w-full p-3 bg-green-800 mt-4 rounded-lg font-semibold text-white">Submit</button>
            </form>
        </div>
    </section>
  )
}

export default EditAddressDetails
