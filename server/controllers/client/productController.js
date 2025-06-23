import { Product , Category } from "../../model/Product.js";

const getAllCategory = async (req,res)=>{
    try{
        const data = await Category.find();
        res.json(data);
    }catch(err){
        console.error(err);
    }
}


const getAllProduct = async (req,res)=>{
    try{
        const data = await Product.find();
        if(data){
            res.json(data);
        }
    }catch(err){
        res.status(500).json(err)
    }
}

export {getAllCategory,getAllProduct}