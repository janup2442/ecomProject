
import { Outlet, Link } from "react-router";
import {useEffect} from 'react'
import { useNavigate } from "react-router";
import {useAuth} from '../authContext'
import Navbar from '../component/navbar'
import Divider from "@mui/material/Divider";
export default function Home() {
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        if(!isAuthenticated){
            navigate('/login');
        }
    })
    return (

        <>
            <div>
                <Navbar/>
                <Divider/>
                <div className="border m-3 rounded shadow-sm">
                    <Outlet />
                </div>
            </div>
        </>
    )
}