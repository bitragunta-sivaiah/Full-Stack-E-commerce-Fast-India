import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import avatar from '../assets/user.png'
import Axios from '../utils/Axios'
import Api from '../common/api'
import { updatedAvatar } from '../store/useSlice'

const UserProfileAvatarEdit = ({ close }) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const handleSubmit = (e)=>{
        e.preventDefault()
    }

    const handleUploadAvatar = async(e)=>{
        const file = e.target.files[0]

        if(!file){
            return
        }

        const formData = new FormData()
        formData.append('avatar',file)

        try {
            setLoading(true)
            const response = await Axios({
                ...Api.uploadAvatar,
                data : formData
            })
            const { data : responseData}  = response

            dispatch(updatedAvatar(responseData.data.avatar))
            close()

        } catch (error) {
            AxiosToastError(error)
        } finally{
            setLoading(false)
        }
    }

    return (
        <section className='fixed w-[100vw] h-[100vh] top-0 bottom-0 right-0 bg-black/20 z-50'>
            <div className='flex items-center justify-center w-full h-full'>
                <div className='w-[500px] max-w-[300px] flex flex-col justify-center items-center bg-white rounded-xl shadow-lg p-8'>
                    <div className='w-16 h-16 rounded-full overflow-hidden mx-auto mb-5'>
                        {
                            user.avatar ? (
                                <img src={user.avatar} alt={user.name}
                                    className='w-full h-full' />
                            ) : (
                                <img src={avatar} alt="" />
                            )
                        }
                    </div>
                    <form action="" onSubmit={handleSubmit}>
                        <label htmlFor="uploadProfile">
                            <span className='text-md cursor-pointer p-2 mt-5 font-rubik bg-primary-orange text-white'>
                            {
                            loading ? "Loading..." : "Upload Avatar"
                        }
                            </span>
                        </label>
                        <input type="file" 
                        onChange={handleUploadAvatar}
                        id='uploadProfile' className='hidden' />
                    </form>

                </div>
            </div>
        </section>
    )
}

export default UserProfileAvatarEdit