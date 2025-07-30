import { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink, Route, Routes } from 'react-router';
import { Link } from 'react-router';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChecklistIcon from '@mui/icons-material/Checklist';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {useAuth} from '../AuthContext'
export default function Navbar() {
    const {isAuthenticated , setIsAuthenticated} = useAuth();
    const [categoryList, setCategoryList] = useState([]);
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        const getAllCategory = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_APP_HOST}/api/category`);
                setCategoryList(res.data);
            } catch (err) {
                alert(err)
            }

            setLoading(false);
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
                            <ul className="dropdown-menu">
                                {
                                    (!isLoading) && categoryList.length > 0 ? categoryList.map((item,index) => (<li key={index}><a className="dropdown-item" href="#" key={item.id}>{item.name}</a></li>)) : (<li>Loading...</li>)
                                }

                            </ul>
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
                            <Link to={'/user/cart'} className='nav-link px-2 py-1 rounded shadow-sm'>
                                <ShoppingCartIcon />
                                <span className='ms-2'>Cart</span>
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
                                isAuthenticated ? (
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
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Our Products</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">About Us</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Contact Us</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">SignUp/Register</a>
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