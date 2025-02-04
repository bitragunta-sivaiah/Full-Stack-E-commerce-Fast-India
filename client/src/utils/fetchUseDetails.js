import Api from "../Api/Api"
import Axios from "./Axios"
 
 

const fetchUserDetails = async()=>{
    try {
        const response = await Axios({
             ...Api.userDetails
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export default fetchUserDetails;