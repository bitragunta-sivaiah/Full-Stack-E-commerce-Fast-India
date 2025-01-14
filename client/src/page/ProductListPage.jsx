import React, { useEffect, useState } from 'react';
import Axios from '../utils/Axios';
import Api from '../common/api';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import CardProduct from '../components/CardProduct';
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [displaySubCategory, setDisplaySubCategory] = useState([]);

  const params = useParams();
  const allSubCategory = useSelector((state) => state.product.allSubCategory);

  const subCategoryName = params.subcategory?.split('-').slice(0, -1).join(' ');
  const categoryId = params.category.split('-').slice(-1)[0];
  const subCategoryId = params.subcategory.split('-').slice(-1)[0];

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...Api.getProductByCategoryAndSubCategory,
        data: {
          categoryId,
          subCategoryId,
          page,
          limit: 10,
        },
      });

      const { data: responseData } = response;
      if (responseData.success) {
        setData((prevData) => (page === 1 ? responseData.data : [...prevData, ...responseData.data]));
        setTotalPage(responseData.totalCount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [params, page]);

  useEffect(() => {
    const filteredSubCategories = allSubCategory.filter((sub) =>
      sub.category.some((cat) => cat._id === categoryId)
    );
    setDisplaySubCategory(filteredSubCategories);
  }, [params, allSubCategory]);

  return (
    <div className="bg-gray-100  sticky top-36 lg:top-20    ">
      <div className="container  mx-auto py-6 md:px-4 px-0 ">
        <div className="flex  sticky top-32  lg:flex-row md:gap-6 gap-1">
          {/* Subcategories */}
          <aside className="bg-white shadow-md  max-h-[88vh] overflow-y-scroll w-[100px] md:w-auto     scrollbarCustom  ">
            <h2 className="lg:text-2xl md:text-xl text-center py-3 font-bold mb-4 border-b pb-2 text-sm">Sub Category</h2>
            <div className="space-y-4 py-2">
              {displaySubCategory.map((s, index) => {
                const link = `/${valideURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`
                return (
                  <Link to={link}
                  key={index}
                  className={`flex flex-col md:flex-col lg:flex-row items-center gap-4 p-2  hover:bg-gray-100 cursor-pointer ${params.subcategory?.includes(s.name) ? 'border-r-[5px] border-green-500 bg-green-50' : ''}`}
                >
                  <div className="w-14 h-14 overflow-hidden  border border-gray-200">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="w-full h-full object-scale-down"
                    />
                  </div>
                  <span className={`md:text-sm lg:text-[17px] line-clamp-1  font-medium text-[11px]  ${params.subcategory?.includes(s.name) ? 'border-r-[5px] text-green-500 bg-green-50' : ''} text-gray-700`}>
                    {s.name}</span>
                </Link>
                )
              }
                
              )}
            </div>
          </aside>

          {/* Products */}
          <main className="flex-1 sticky top-32 max-h-[80vh] overflow-y-scroll scrollbarCustom bg-white rounded-lg md:p-6 p-0">
            <div className="mb-4">
              <h1 className="text-xl font-bold text-gray-800 border-b pb-2">{subCategoryName}</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 mx-auto md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
              {data.map((product, index) => (
                <div key={`${product._id}-product-${index}`} className="bg-white rounded-lg   ">
                  <CardProduct data={product} />
                </div>
              ))}
            </div>

            {loading && (
              <div className="flex justify-center mt-6">
                <Loading />
              </div>
            )}

            
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
