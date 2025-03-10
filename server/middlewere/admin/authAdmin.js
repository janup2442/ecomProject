const authAdmin = (req,res,next)=>{
    if(req.cookies.authToken){
        // the check the validity of the authToken here 
        res.status(200).end(); // tmeperory check
    }else{
        res.status(401).json({message:"Bad request , PLease login"})
    }
}


export default authAdmin