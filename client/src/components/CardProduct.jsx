import React, { useState } from 'react';
import { LuTimer } from "react-icons/lu";
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { Link } from 'react-router-dom';
import Axios from '../utils/Axios';
import { valideURLConvert } from '../utils/valideURLConvert';
import AxiosToastError from '../utils/AxiosToastError';
import Api from '../Api/Api';
import toast from 'react-hot-toast';
import { useGlobalContext } from '../provider/GlobalProvider'
import AddToCartButton from './AddToCartButton';

const CardProduct = ({ data }) => {
  // Calculate the original price
    const url = `/product/${valideURLConvert(data.name)}-${data._id}`
  const originalPrice = data.price / (1 - (data.discount / 100));
  const [loading,setLoading] = useState(false)

  const {fetchCartItem , updateCartItem} = useGlobalContext()

  const handleAddToCart = async(e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setLoading(true);
      const response = await Axios({
        ...Api.addTocart,
        data: {
          productId: data?._id
        }
      })
      const { data: responseData } = response;
      if(responseData.success){
        toast.success(responseData.message)
        if(fetchCartItem){
          fetchCartItem()
        }
      }
    } catch (error) {
      AxiosToastError(error)
    }finally {
      setLoading(false);
    }
  }
 

  return (
    <Link to={url}>
      <div className='border-[1.5px] py-1 sm:w-40 mx-auto border-[#ededee] px-2 rounded-lg lg:p-4 grid  overflow-hidden lg:gap-3 w-32  md:w-36 lg:min-w-52 gap-1 cursor-pointer bg-white'>
        <div className='lg:h-32 md:h-28 h-20 w-full rounded-lg overflow-hidden'>
          <img src={data.image[0]} alt="" className='w-full h-full object-scale-down' />
        </div>
        <div className='flex items-center gap-[2px] font-inter font-semibold p-1 px-1 text-[10px] w-fit bg-green-100 text-green-600 rounded-sm'>
          <LuTimer size={14} /> 15 MINS
        </div>
        <div className='font-inter text-sm line-clamp-2 font-medium'>
          {data.name}
        </div>
        <div >
        <div className='font-medium text-gray-400 w-fit text-sm'>
          {data.unit}
        </div>
       <p className='font-rubik font-semibold my-2 text-green-500 text-sm flex items-center'>{data.discount} % <span className="ml-1">Off</span> </p>

        </div>

        <div className='flex items-center justify-between gap-3'>
          <div className='font-semibold text-[12px] md:text-[14px] font-rubik'>
            ₹{data.price}
            <div className='font-thin line-through text-gray-400 text-[10px] md:text-[13px]'>
              {DisplayPriceInRupees(originalPrice)}
            </div>
          </div>
          <div className="">
            {
              data.stock > 0 ? (
                <AddToCartButton data={data} />
              ) : (
                <div className='bg-red-100 font-rubik text-red-600 text-[14px] cursor-not-allowed font-medium p-2 rounded-sm'>
                  Out of Stock
                </div>
              )
            }
          </div>
           
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
