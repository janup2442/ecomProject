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
        const data = await Product.find({},'price name images discountValue brand rating');
        if(data){
            res.status(200).json(data);
        }
    }catch(err){
        res.status(500).json(err)
    }
}


const getProductDetail = async (req,res)=>{
    const id = req.query.id
    console.log(id);
    
    try {
        const result = await Product.findById(id);
        if(result){
            res.status(200).json(result);
        }else{
            res.status(400).json({message:"400! Bad Request , Try after sometime"})
        }
    } catch (error) {
        res.status(500).json({message:"something went wrong ,server error"})
    }
}
export {getAllCategory,getAllProduct,getProductDetail}