import cloudinary from "./config/cloudinary.js";
import { Product } from "./model/Product.js";
import Admin from "./model/Admin.js";
import connectDB from "./config/db.js";
connectDB();

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

// showproduct();



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

const createAdmin = async () => {
    try {
        const payload = new Admin({
            email:'kcl@co123',
            password:'kcl@co',
            role:'Admin'
        })
        console.log(payload);
        const idk = await payload.save();
        console.log(idk);
        
        console.log("data saved to database");
        
        
        
    } catch (error) {
        console.log(error.message);
        console.log("there is an error\n");
        process.exit();
        
    }
}

createAdmin();