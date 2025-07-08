
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState,useEffect } from 'react'
// import axios from 'axios'
import ClientHome from './home.jsx'
import Footer from '../component/footer.jsx'
import Navbar from '../component/navbar.jsx'
import LoginPage from './userLogin.jsx'
import UserSignUp from './userSignup.jsx'
import UserDashboard from './userProfile.jsx'
import axios from 'axios'
import TestingPage from './test.jsx'


export default function ClientHomeLayout() {


    const [isLoggedIn, setLogin] = useState(false);

    const checkIfLoggedIn = async () => {
        const result = await axios.get(`${import.meta.env.VITE_APP_API_HOST}/verify`,{
            withCredentials:true
        })
        if(result.status>=200 && result.status<400){
            setLogin(true);
        }
    }

    useEffect(()=>{
        try{
            

        }catch(err){
            alert("Something went wrong , Its not you its us .")
        }
    },[isLoggedIn])

    return (

        <>
            <Router>
                <header>
                    <Navbar isLoggedIn={isLoggedIn} />
                </header>

                <main>
                    <Routes>
                        <Route path='/' element={<ClientHome/>}/>
                        <Route path='/login' element={<LoginPage setIsAuthenticated={setLogin} isLoggedIn={isLoggedIn}/>}/>
                        <Route path='/register' element={<UserSignUp isLoggedIn = {isLoggedIn}/>}/>
                        <Route path='/user/profile/:id' element={<UserDashboard isLoggedIn={isLoggedIn}/>}/>
                        <Route path='/test' element={<TestingPage/>}/>
                    </Routes>
                </main>

                <footer>
                    <Footer />
                </footer>
            </Router>
        </>
    )
}