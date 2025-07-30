import { Outlet, useNavigate, useParams } from "react-router-dom"; // Fixed import
import { useEffect } from 'react';
import {useAuth} from '../../AuthContext'
import axios from "axios";
export default function UserDashboardLayout() {
    const { id } = useParams();

    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();
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

    useEffect(()=>{

    },[])



    return (
        <>
            <div>
                <h1>this is user page {id}</h1>
                <Outlet/>
            </div>
        </>
    );
}

