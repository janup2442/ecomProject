const authAdmin = (req,res,next)=>{
    if(req.cookies.authToken){
        next();
    }else{
        res.status(400).json({message:"Bad request , PLease login"})
    }
}


export default authAdmin