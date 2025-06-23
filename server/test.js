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