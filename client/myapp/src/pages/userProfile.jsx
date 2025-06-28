import { useNavigate, useParams } from "react-router-dom"; // Fixed import
import { useEffect, useState } from 'react';
import axios from "axios";

export default function UserDashboard({ isloggedIn }) {
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

    useEffect(() => {
        getUserInfo(); // Call the function
    }, []); // Fix dependency array

    return (
        <>
            {
                alert != null ? (
                    <div className="alert alert-danger">{alert}</div>
                ) : (
                    <Profile userObject={userObject} />
                )
            }
        </>
    );
}

function Profile({ userObject }) {
    return (
        <>
            <div>
                <Section>
                    <h2>User Profile</h2>
                    <p>Name: {userObject?.name || 'Loading...'}</p>
                    <p>Email: {userObject?.email || 'Loading...'}</p>
                </Section>
            </div>
        </>
    );
}

function Section({ children }) {
    return (
        <section className="px-2 py-1 border shadow-sm rounded mx-2 my-3">
            {children}
        </section>
    );
}