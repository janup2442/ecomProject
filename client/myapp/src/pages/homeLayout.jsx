
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState,useEffect } from 'react'
// import axios from 'axios'
import ClientHome from './home.jsx'
import Footer from '../component/footer.jsx'
import Navbar from '../component/navbar.jsx'
import LoginPage from './userLogin.jsx'
import UserSignUp from './userSignup.jsx'
import UserDashboard from './userProfile.jsx'


export default function ClientHomeLayout() {


    const [isLoggedIn, setLogin] = useState(false);

    useEffect(()=>{
        if(localStorage.getItem('authToken')){
            setLogin(true)
        }else{
            setLogin(false)
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
                    </Routes>
                </main>

                <footer>
                    <Footer />
                </footer>
            </Router>
        </>
    )
}