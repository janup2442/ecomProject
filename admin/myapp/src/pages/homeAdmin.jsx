import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";


export default function HomeAdmin(){
    const [isLogout , setLogout] = useState(false)
    const navigate = useNavigate()
    const logout = ()=>{
        console.log("logout please");
        
        try{
            const logoutUser = async ()=>{
                const result  = await axios.get('http://localhost:8080/logout',{
                    withCredentials:true
                })
                setLogout(true)
            }
            logoutUser()
        }catch(err){
            console.log( err.message);
            
        }
    }
    return(

        <>
            <div>Admin home page </div>
            {
                isLogout?<Navigate to="/login" />:null
            }
            <button type="button" onClick={()=>logout()}>Logout</button>
        </>
    )
}