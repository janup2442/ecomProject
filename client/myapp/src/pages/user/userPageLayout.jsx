import { Outlet, useNavigate, useParams } from "react-router-dom"; // Fixed import
import { useEffect, useState } from 'react';
import axios from "axios";

export default function UserDashboardLayout({ isloggedIn }) {
    const [userObject, setUser] = useState({});
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    const getUserInfo = async () => {
        try {
            const result = await axios.get(`${import.meta.env.VITE_API_APP_HOST}/user/profile`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Add Bearer prefix
                }
            });
            
            if (result.status >= 200 && result.status < 400) {
                setUser(result?.data);
            } else {
                navigate('/login');
            }
        } catch (error) {
            setAlert("Something went wrong, Try again after sometime");
            console.error(error);
        }
    };

    // dont forget to call the getUser() , in useEffect

    return (
        <>
            <div>
                <Outlet/>
            </div>
        </>
    );
}

