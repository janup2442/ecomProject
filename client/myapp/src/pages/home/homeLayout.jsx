
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
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
import { useAuth } from '../../AuthContext.jsx'
import Cart from '../user/cart/cartPage.jsx'
import CheckoutPage from '../user/cart/checkout.jsx'
import OrderPage from '../user/orderPage.jsx'
import Wishlist from '../user/wishList.jsx'
import CartLayout from '../user/cart/cartLayout.jsx'
export default function ClientHomeLayout() {
    const { isAuthenticated } = useAuth();
    useEffect(() => {
        console.log("you are on home layout page");

    }, [])
    return (

        <>
            <Router>
                <header>
                    <Navbar />
                </header>

                <main className='bg-body-tertiary'>
                    <Routes>
                        <Route path='/' element={<ClientHome />} />
                        <Route path='/product/:id' element={<ProductPage />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/register' element={<UserSignUp />} />


                        <Route path='/user' element={isAuthenticated ? <UserDashboardLayout /> : <Navigate to={'/login'} replace />}>
                            <Route path='profile' index element={<UserProfile />} />

                            <Route path='cart' element={<CartLayout/>}>
                                <Route index element={<Cart/>} />
                                <Route path='checkout' element={<CheckoutPage/>} />
                            </Route>

                            <Route path='orders'  element={<OrderPage />} />
                            <Route path='wishlist'  element={<Wishlist />} />
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