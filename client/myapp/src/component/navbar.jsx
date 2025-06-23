import { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink , Route , Routes } from 'react-router';

export default function Navbar({isLoggedIn , setLogin}) {
    const [categoryList, setCategoryList] = useState([]);
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        const getAllCategory = async () => {
            setLoading(true)
            try {
                const res = await axios.get('http://localhost:8000/api/category');
                setCategoryList(res.data);
                setLoading(false)
            } catch (err) {
                alert(err)
            }
        }


        getAllCategory();

    }, [])


    return (
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href='/'>
                        <img src='/noBgLogo.png' width={150} alt='Kanpuri Classic Leathers'/>
                    </a>
                    <button className="d-md-none navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbr" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* for larger screen size */}

                    <ul className='d-none d-md-flex nav'>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Categories
                            </a>
                            <ul className="dropdown-menu">
                                {
                                    (!isLoading) && categoryList.length > 0 ? categoryList.map((item) => (<li><a className="dropdown-item" href="#" key={item.id}>{item.name}</a></li>)) : (<li>Loading...</li>)
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

                    <ul className='d-none d-md-flex nav nav-underline'>
                        <li className='nav-item'>
                            <a href='' className='nav-link'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="dark" className="bi bi-cart3" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                </svg>
                                <span className='text-dark ms-2'>Cart</span>
                            </a>
                        </li>


                        <li className='nav-item'>
                            <a className='nav-link' href=''>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="dark" className="bi bi-list-stars" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5" />
                                    <path d="M2.242 2.194a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.28.28 0 0 0-.094.3l.173.569c.078.256-.213.462-.423.3l-.417-.324a.27.27 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.28.28 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.27.27 0 0 0 .259-.194zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.28.28 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.27.27 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.28.28 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.27.27 0 0 0 .259-.194zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.28.28 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.27.27 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.28.28 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.27.27 0 0 0 .259-.194z" />
                                </svg>
                                <span className='text-dark ms-2'>
                                    WishList
                                </span>
                            </a>
                        </li>

                        <li className='nav-item mx-2'>
                            <a className='nav-link' href=''>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="dark" className="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                </svg>
                            </a>
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

function UserProfile(){
    return(
        <>
            <div>
                <NavLink to={'/profile'}>
                
                </NavLink>
            </div>
        </>
    )
}