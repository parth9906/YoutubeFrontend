import axios from "axios";


export const callAPIWithAxios = async(url, body, headers)=>{
    let data = {'message': "something went wrong."}
    console.log(url,body, headers)
    try {
        const response = await axios.post(url,body, {headers});
        data =  response?.data;
    } catch (error) {
        data = error?.response?.data
    }finally{
        return data;
    }

}
