import cloudinary from "./config/cloudinary.js";
import { Product } from "./model/Product.js";

const deleteAll = async ()=>{
    try{
        await cloudinary.api.delete_all_resources();
    }catch(err){
        console.error(err);
    }
}

// deleteAll();

const showproduct =async ()=>{
    try{
        const res = await Product.find();
        console.log(res);
        
    }catch(err){
        console.log(err);
        
    }
}

showproduct();



const getUserData = async ()=>{
        try {
            const result = await axios.get(`${import.meta.env.VITE_API_APP_HOST}/user/profile`,{
                withCredentials:true
            })

            if(result.status>=200 && result.status<400){
                   
            }
            
        } catch (error) {
            console.log(error);
        }
}