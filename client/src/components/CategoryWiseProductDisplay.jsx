import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import Api from '../Api/Api';
import CardLoading from './CardLoading';
import CardProduct from './CardProduct';

import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { valideURLConvert } from '../utils/valideURLConvert';
import { Link } from 'react-router-dom';

const CategoryWiseProductDisplay = ({ id, name }) => {
  const [loading, setLoading] = useState(false);
  const setLoadingCategory = useSelector((state) => state.product.setLoadingCategory);
  const [data, setData] = useState([]);
  const loadingCardNumber = new Array(8).fill(null);
  const containerRef = useRef();
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightDisabled, setIsRightDisabled] = useState(false);
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const fetchCategoryWiseProduct = async () => {
    try {
      const response = await Axios({
        ...Api.getProductByCategory,
        data: {
          id: id,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleScroll = (direction) => {
    const container = containerRef.current;
    const scrollAmount = 200;

    if (direction === 'right') {
      container.scrollLeft += scrollAmount;
    } else {
      container.scrollLeft -= scrollAmount;
    }

    setIsLeftVisible(container.scrollLeft > 0);
    setIsRightDisabled(container.scrollLeft + container.offsetWidth >= container.scrollWidth);
  };

  useEffect(() => {
    fetchCategoryWiseProduct();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    setIsLeftVisible(container.scrollLeft > 0);
    setIsRightDisabled(container.scrollLeft + container.offsetWidth >= container.scrollWidth);
  }, [data]);

  const handleRedirectProductListpage = ()=>{
    const subcategory = subCategoryData.find(sub =>{
      const filterData = sub.category.some(c => {
        return c._id == id
      })

      return filterData ? true : null
    })
    const url = `/${valideURLConvert(name)}-${id}/${valideURLConvert(subcategory?.name)}-${subcategory?._id}`

    return url
}

const redirectURL =  handleRedirectProductListpage()

  return (
    <div>
      <div className="flex items-center justify-between mx-auto p-4">
        <h2 className="md:text-2xl text-sm font-semibold text-gray-700">{name}</h2>
        <Link to={redirectURL} className="text-sm font-semibold md:text-[18px] text-green-600 bg-green-100 p-2 rounded-md hover:bg-green-200 transition">
          View All
        </Link>
      </div>
      <div className="relative">
        <div
          className="flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto scroll-smooth no-scrollbar container mx-auto"
          ref={containerRef}
        >
          {loading &&
            loadingCardNumber.map((_, index) => (
              <CardLoading key={"categorywiseProductDisplay123" + index} index={index} />
            ))}

          {data.map((p, index) => (
            <CardProduct data={p} key={p._id + "CategorywiseProductDisplay" + index} />
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 items-center hidden lg:flex">
          <button
            className={`z-10 bg-white text-black shadow text-lg p-3 rounded-full transition-opacity duration-300 ${isLeftVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => handleScroll('left')}
          >
            <FaChevronLeft />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 items-center hidden lg:flex">
          <button
            className={`z-10 bg-white text-black shadow text-lg p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition`}
            onClick={() => handleScroll('right')}
            disabled={isRightDisabled}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
