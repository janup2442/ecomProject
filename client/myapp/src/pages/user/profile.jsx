import axios from "axios";
import { useNavigate } from "react-router"
import {useEffect} from 'react'
import Button from "@mui/material/Button";
import {useAuth} from '../../AuthContext'
import { BestBox } from "../../component/containers";
export default function UserProfile() {
    const navigate = useNavigate();
    const {isAuthenticated,setIsAuthenticated} =useAuth(); 
    const logoutUser = async ()=>{
        try {
            const result = await axios.get(`${import.meta.env.VITE_API_APP_HOST}/user/logout`,{
                withCredentials:true
            })

            if(result.status>=200 && result.status<400){
                console.log("you just loogeed out");
                
                setIsAuthenticated(false)
                navigate('/', {replace:true});
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        console.log("you are on user profile page");
        
    },[])

    return(

        <>
            <div>
                <UserInfoBlock/>


                Underdevelopment , Will be available in a while.
                <Button variant="outline" className="btn btn-primary" onClick={logoutUser}>Logout</Button>
            </div>
        </>
    )
}


function UserInfoBlock({user}) {
    return(
        <>
            <div>
                <BestBox>
                    THis is some dummy data , it is new 

                </BestBox>
            </div>
        </>
    )
}


function UserActionButtons() {
    return(
        <>
        
        </>
    )
}