import { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink, Route, Routes } from 'react-router';
import { Link } from 'react-router';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChecklistIcon from '@mui/icons-material/Checklist';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {useAuth} from '../AuthContext'
import {useCart} from '../CartContext'
export default function Navbar() {
    const {isAuthenticated , setIsAuthenticated, isLoading: authLoading} = useAuth();
    const {cartCount} = useCart();
    const [categoryList, setCategoryList] = useState([]);
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        const getAllCategory = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_APP_HOST}/api/category`);
                setCategoryList(res.data);
            } catch (err) {
                console.error('Failed to load categories:', err);
                setCategoryList([]);
            } finally {
                setLoading(false);
            }
        }
        getAllCategory();
    }, [])


    return (
        <>
            <nav className="navbar">
                <div className="container-fluid">
                    <a className="navbar-brand" href='/'>
                        <img src='/noBgLogo.png' width={150} alt='Kanpuri Classic Leathers' />
                    </a>
                    <button className="d-md-none navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbr" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* for larger screen size */}

                    <ul className='d-none d-md-flex nav align-items-center'>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Categories
                            </a>
                            {/* <ul className="dropdown-menu">
                                {
                                    (!isLoading) && categoryList?.length > 0 ? categoryList?.map((item,index) => (<li key={index}><a className="dropdown-item" href="#" key={item.id}>{item.name}</a></li>)) : (<li>Loading...</li>)
                                }

                            </ul> */}
                        </li>
                        <li className='nav-item'>
                            <form className='d-flex'>
                                <input type="search" className='form-control me-2' placeholder='Search'></input>
                                <button className='btn btn-outline-success'>Search</button>
                            </form>
                        </li>
                    </ul>

                    <ul className='d-none d-md-flex nav'>
                        <li className='nav-item text-dark'>
                            <Link to={'/user/cart'} className='nav-link px-2 py-1 rounded shadow-sm position-relative'>
                                <ShoppingCartIcon />
                                <span className='ms-2'>Cart</span>
                                {cartCount > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {cartCount > 99 ? '99+' : cartCount}
                                        <span className="visually-hidden">items in cart</span>
                                    </span>
                                )}
                            </Link>
                        </li>


                        <li className='nav-item'>
                            <Link to={'/user/wishlist'} className='nav-link px-2 py-1 rounded shadow-sm'>
                                <ChecklistIcon />
                                <span className='ms-2'>
                                    WishList
                                </span>
                            </Link>
                        </li>

                        <li className='nav-item mx-2'>
                            {
                                isAuthenticated === true ? (
                                    <Link to={'/user/profile'} className='nav-link px-2 py-1 rounded shadow-sm'>
                                        <AccountBoxIcon />
                                    </Link>
                                ) : (
                                    <Link to={'/login'} className='nav-link text-light px-2 py-1 rounded shadow-sm bg-primary'>
                                        Login
                                    </Link>
                                )
                            }
                        </li>
                    </ul>



                    {/* for small screen size , less than or equal to a tablet size */}

                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                                <img src='/noBgLogo.png' width={120} alt='Kanpuri Classic Leathers' />
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Categories
                                    </a>
                                    {/* Add category list here */}
                                </li>
                                <li className="nav-item">
                                    <form className='d-flex mb-3'>
                                        <input type="search" className='form-control me-2' placeholder='Search products...'></input>
                                        <button className='btn btn-outline-success' type="submit">Search</button>
                                    </form>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/user/cart">
                                        <ShoppingCartIcon className='me-2' />
                                        Cart
                                        {cartCount > 0 && (
                                            <span className="badge bg-danger ms-2">
                                                {cartCount > 99 ? '99+' : cartCount}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/user/wishlist">
                                        <ChecklistIcon className='me-2' />
                                        Wishlist
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    {
                                        authLoading ? (
                                            <span className="nav-link">Loading...</span>
                                        ) : isAuthenticated === true ? (
                                            <Link className="nav-link" to="/user/profile">
                                                <AccountBoxIcon className='me-2' />
                                                Profile
                                            </Link>
                                        ) : (
                                            <>
                                                <Link className="nav-link" to="/login">Login</Link>
                                                <Link className="nav-link" to="/register">Sign Up</Link>
                                            </>
                                        )
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

function UserProfile() {
    return (
        <>
            <div>
                <NavLink to={'/profile'}>

                </NavLink>
            </div>
        </>
    )
}