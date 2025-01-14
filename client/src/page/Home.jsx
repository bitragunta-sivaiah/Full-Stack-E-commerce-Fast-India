import React from 'react'
import banner from '../assets/banner.jpg'
import bannerMobile from '../assets/banner-mobile.jpg'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { valideURLConvert } from '../utils/valideURLConvert'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
const Home = () => {

  const navigate = useNavigate()
  const setLoadingCategory = useSelector(state => state.product.setLoadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  const subcategoryData = useSelector(state => state.product.allSubCategory)

  const handleRedirectProductList = (id,cat) => {
   console.log(id,cat)
      const subcategory = subcategoryData.find(sub =>{
        const filterData = sub.category.some(c => {
          return c._id == id
        })

        return filterData ? true : null
      })
      const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`

      navigate(url)
      console.log(url)
  }
  return (
    <section className='container mx-auto mt-8' >
      <div className={`min-h-48 w-full h-full bg-slate-200 container mx-auto rounded-2xl ${!banner && " animate-pulse" } `}>
          <img src={banner} alt="" className='w-full h-full hidden lg:block'/>
          <img src={bannerMobile} alt="" className='w-full h-full lg:hidden'/>
      </div>
      
      {/* produts */}
      <div className="container mx-auto px-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-10  md:gap-2">
        {
          setLoadingCategory ? (

            new Array(12).fill(null).map((c,index)=>{
              return (
                <div key={index + "loadingCategory"} className='bg-white p-2 rounded-lg shadow-md animate-pulse'>
                  <div className='h-48 bg-slate-200 rounded-lg'></div>
                  <div className='mt-2'>
                    <div className='w-2/3 h-4 bg-slate-200 rounded-lg animate-pulse'></div>
                    <div className='w-1/3 h-4 bg-slate-200 rounded-lg mt-2 animate-pulse'></div>
                  </div>
                </div>
              )
            })
          ):(
            categoryData.map((cat,index)=>{
              return (
                <div onClick={()=>handleRedirectProductList(cat._id , cat.name)} key={index} className='bg-white p-2 rounded-lg '>
                  <div className='h-36 md:h-40 bg-white rounded-lg'>
                    <img src={cat.image} alt="" className='w-full h-full object-cover'/>
                  </div>
                  {/* <div className='mt-2'>
                    <div className='w-2/3 h-4 bg-slate-200 rounded-lg'></div>
                    <div className='w-1/3 h-4 bg-slate-200 rounded-lg mt-2'></div>
                  </div> */}
                </div>
              )
            })
          )
        }
      </div>

      {/* display category project */}
      {
        categoryData.map((cat,index)=>{
          return (
            <CategoryWiseProductDisplay key={index} id={cat?._id} name={cat?.name} />
          )
        })
      }
    
    </section>
  )
}

export default Home