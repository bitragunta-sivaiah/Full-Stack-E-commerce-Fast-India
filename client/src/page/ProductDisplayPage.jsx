import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import { FaAngleRight, FaAngleLeft, FaMinus, FaPlus } from "react-icons/fa6";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import Divider from "../components/Divider";
import image1 from "../assets/minute_delivery.png";
import image2 from "../assets/Best_Prices_Offers.png";
import image3 from "../assets/Wide_Assortment.png";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import Api from "../common/api";
import { LuTimer } from "react-icons/lu";
import AddToCartButton from "../components/AddToCartButton";

const ProductDisplayPage = () => {
  const params = useParams();
  let productId = params?.product?.split("-")?.slice(-1)[0];
  const [data, setData] = useState({
    name: "",
    image: [],
  });
  const [image, setImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const imageContainer = useRef();
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);

  const fetchProductDetails = async () => {
    try {
      const response = await Axios({
        ...Api.getProductDetails,
        data: {
          productId: productId,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  // Automatic Image Slideshow
  useEffect(() => {
    const imageCount = data.image.length;
    if (imageCount > 1) {
      const interval = setInterval(() => {
        setImage((prevImage) => (prevImage + 1) % imageCount);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [data.image]);

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100;
  };

  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100;
  };

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setShowZoom(true);
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
  };

  const originalPrice = data.price / (1 - (data.discount / 100));

  return (
    <section className="container mx-auto p-4 grid lg:grid-cols-2 gap-4">
      {/* Left Section: Image Viewer */}
      <div className="relative lg:h-[80vh] overflow-x-scroll scrollbarCustom ">
        <div
          className="relative bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={data.image[image]}
            className="w-full h-full object-scale-down"
            alt="product"
          />
        </div>
        <div className="flex items-center my-4 justify-center gap-3 overflow-hidden">
          {data.image.map((img, index) => (
            <div
              key={img + index + "point"}
              className={`bg-slate-200 w-3 h-3 lg:w-3 lg:h-3 rounded-full ${
                index === image && "bg-slate-800"
              }`}
            ></div>
          ))}
        </div>
        <div className="grid relative">
          <div
            ref={imageContainer}
            className="flex items-center justify-center gap-4 z-20 relative w-full overflow-x-hidden scrollbarCustom"
          >
            {data.image.map((img, index) => (
              <div className="w-12 h-12 md:w-20 md:h-20" key={index}>
                <img
                  src={img}
                  alt="thumbnail"
                  onClick={() => setImage(index)}
                  className="w-full h-full object-scale-down cursor-pointer"
                />
              </div>
            ))}
          </div>
          <div className="w-full bg-transparent ml-3 z-10 h-full hidden lg:flex justify-between absolute items-center">
            <button
              onClick={handleScrollLeft}
              className="z-10 bg-white relative p-1 rounded-full shadow"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={handleScrollRight}
              className="z-10 bg-white relative right-6 p-1 rounded-full shadow"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        <div className="my-4 hidden lg:grid gap-3">
          <div>
            <p className="font-semibold lg:text-2xl text-xl font-rubik mt-6">
              Description
            </p>
            <p className="text-base font-poppins">{data.description}</p>
          </div>
          <div>
            <p className="font-semibold lg:text-2xl text-xl font-rubik mt-6">
              Unit
            </p>
            <p className="text-base font-poppins">{data.unit}</p>
          </div>
          {data?.more_details &&
            Object.keys(data?.more_details).map((element, index) => (
              <div key={index}>
                <p className="font-semibold lg:text-2xl text-xl font-rubik mt-6">
                  {element}
                </p>
                <p className="text-base font-poppins">
                  {data?.more_details[element]}
                </p>
              </div>
            ))}
        </div>
      </div>
                
      {/* Right Section: Zoomed Image */}
      {showZoom && (
        <div
          className="relative bg-no-repeat w-full hidden lg:block  bg-white border rounded-lg shadow-md"
          style={{
            backgroundImage: `url(${data.image[image]})`,
            backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
            backgroundSize: "200%",
            height: "80vh",
            width: "100%",
          }}
        ></div>
      )}

      {/* Product Information */}
      <div className="p-4 lg:pl-7 text-base lg:text-lg">
        <h2 className="md:text-2xl font-inter sm:text-xl line-clamp-1 font-semibold lg:text-3xl">{data.name}</h2>
         <div className='flex items-center gap-[2px] font-inter font-semibold p-1 px-1 text-[12px] w-fit bg-green-100 text-green-600 rounded-sm'>
          <LuTimer size={14} /> 15 MINS
          <hr className="bg-gray-600 h-1"  />
        </div>
       
        <div className="flex items-center justify-between">
        <div>
        <p className=" font-semibold mt-4 text-gray-500">{data.unit}</p>
       <div className="flex items-center gap-2 md:gap-5">
       <p className='font-rubik font-semibold my-2 text-xl'>₹{data.price} </p>
       <p className='font-rubik font-semibold my-2 text-green-500 text-xl flex items-center text-[8px]'>({data.discount} % <p className="ml-1">Off )</p> </p>
       </div>
        <h3 className="font-rubik text-gray-600 line-through">{DisplayPriceInRupees(originalPrice)}</h3>
        <p className="text-[10px] font-normal">(Inclusive of all taxes)</p>
        </div>
      
        </div>
        {data.stock === 0 ? (
          <p className="text-lg text-red-500 my-2">Out of Stock</p>
        ) : (
           <div className="my-4"> <AddToCartButton data={data}/></div>
        )}
        <h2 className="font-semibold">Why shop from FastIndia? </h2>
        <div>
          {/* Benefits Section */}
          <div className="flex items-center gap-4 my-4">
            <img
              src={image1}
              alt="superfast delivery"
              className="w-20 h-20"
            />
            <div className="text-sm">
              <div className="font-semibold">Superfast Delivery</div>
              <p>
                Get your order delivered to your doorstep at the earliest from
                dark stores near you.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 my-4">
            <img
              src={image2}
              alt="Best prices offers"
              className="w-20 h-20"
            />
            <div className="text-sm">
              <div className="font-semibold">Best Prices & Offers</div>
              <p>
                Best price destination with offers directly from the
                manufacturers.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 my-4">
            <img
              src={image3}
              alt="Wide Assortment"
              className="w-20 h-20"
            />
            <div className="text-sm">
              <div className="font-semibold">Wide Assortment</div>
              <p>
                Choose from 5000+ products across food, personal care, household
                & other categories.
              </p>
            </div>
            
          </div>
          <div className='my-4  lg:hidden grid gap-3 '>
                <div>
                    <p className='font-semibold lg:text-2xl text-xl font-rubik  mt-6'>Description</p>
                    <p className='text-base font-poppins'>{data.description}</p>
                </div>
                <div>
                    <p className='font-semibold lg:text-2xl text-xl font-rubik mt-6'>Unit</p>
                    <p className='text-base font-poppins'>{data.unit}</p>
                </div>
                {
                  data?.more_details && Object.keys(data?.more_details).map((element,index)=>{
                    return(
                      <div key={index}>
                          <p className='font-semibold lg:text-2xl text-xl font-rubik mt-6'>{element}</p>
                          <p className='text-base font-poppins'>{data?.more_details[element]}</p>
                      </div>
                    )
                  })
                }
      </div>
      
        </div>
      </div>
    </section>
  );
};

export default ProductDisplayPage;
