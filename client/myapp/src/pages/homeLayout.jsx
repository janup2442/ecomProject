
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ClientHome from './home.jsx'
import Footer from '../component/footer.jsx'
import Navbar from '../component/navbar.jsx'
import LoginPage from './userLogin.jsx'
import UserSignUp from './userSignup.jsx'


export default function ClientHomeLayout() {


    const [isLoggedIn, setLogin] = useState(false);

    return (

        <>
            <Router>
                <header>
                    <Navbar isLoggedIn={isLoggedIn} setLogin={setLogin} />
                </header>

                <main>
                    <ClientHome />
                    <Routes>
                        <Route path='/' element={<ClientHome/>}/>
                        <Route path='/login' element={<LoginPage/>}/>
                        <Route path='/register' element={<UserSignUp/>}/>
                        <Route path='/register' element={<UserSignUp/>}/>
                    </Routes>
                </main>

                <footer>
                    <Footer />
                </footer>
            </Router>
        </>
    )
}