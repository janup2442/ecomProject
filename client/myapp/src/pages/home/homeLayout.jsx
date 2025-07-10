
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
// import axios from 'axios'
import ClientHome from './home.jsx'
import Footer from '../../component/footer.jsx'
import Navbar from '../../component/navbar.jsx'
import LoginPage from '../loginAndSignUp/userLogin.jsx'
import UserSignUp from '../loginAndSignUp/userSignup.jsx'
import UserDashboardLayout from '../user/userPageLayout.jsx'
import axios from 'axios'
import TestingPage from '../test.jsx'
import ProductPage from '../product/product.jsx'
import UserProfile from '../user/profile.jsx'


export default function ClientHomeLayout() {


    const [isLoggedIn, setLogin] = useState(true);

    const checkIfLoggedIn = async () => {
        const result = await axios.get(`${import.meta.env.VITE_APP_API_HOST}/verify`, {
            withCredentials: true
        })
        if (result.status >= 200 && result.status < 400) {
            setLogin(true);
        }
    }

    return (

        <>
            <Router>
                <header>
                    <Navbar isLoggedIn={isLoggedIn} />
                </header>

                <main className='bg-body-tertiary'>
                    <Routes>
                        <Route path='/' element={<ClientHome />} />
                        <Route path='/product/:id' element={<ProductPage />} />
                        <Route path='/login' element={<LoginPage setIsAuthenticated={setLogin} isLoggedIn={isLoggedIn} />} />
                        <Route path='/register' element={<UserSignUp isLoggedIn={isLoggedIn} />} />
                        <Route path='/user' element={<UserDashboardLayout isLoggedIn={isLoggedIn}/>}>
                            <Route path='profile' index element={<UserProfile/>}/>
                        </Route>
                        <Route path='/test' element={<TestingPage />} />
                    </Routes>
                </main>

                <footer>
                    <Footer />
                </footer>
            </Router>
        </>
    )
}