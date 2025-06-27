
import { Await, Outlet, useNavigate, useParams } from "react-router"
import {useEffect,useState} from 'react'
import axios from "axios";
export default function UserDashboard({isloggedIn}){
    
    const [userObject,setUser] = useState({});
    const [alert , setAlert] = useState(null)
    const navigate = useNavigate();

    const getUserInfo = async ()=>{
        try{
            const result = await axios.get(`${import.meta.env.VITE_API_APP_HOST}/user/profile`,{headers:{
                'Authorization' : localStorage.getItem('authToken')
            }})
            if(result.status<400 && result.status>=200){
                setUser(result?.data)

            }else{
                navigate('/login')
            }
        }catch(error){
            setAlert("Something went wrong , Try again after sometime")
            console.log(error);
        }
    }

    useEffect(()=>{

    },[userObject])
    
   
    const {id} = useParams();
    return(
        <>
            {
                alert!=null?(<div className="alert alert-danger">{alert}</div>):<Profile/>
            }
        </>
    )
}


function Profile() {
    
    return(
        <>
            <div>
                <Section>
                    
                </Section>

            </div>
        </>
    )
}

function Section({children}) {
    return(
        <>
            <section className="px-2 py-1 border shadow-sm rounded mx-2 my-3">
                {children}
            </section>
        </>
    )
    
}