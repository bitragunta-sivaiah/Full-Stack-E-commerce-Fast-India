import Axios from '../utils/Axios'
import Api from '../common/api'

const uploadImage = async(image)=>{
    try {
        const formData = new FormData()
        formData.append('image',image)

        const response = await Axios({
            ...Api.uploadImage,
            data : formData
        })

        return response
    } catch (error) {
        return error
    }
}

export default uploadImage