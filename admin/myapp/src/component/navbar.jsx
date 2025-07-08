
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { useState } from 'react'
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import { useAuth } from '../authContext'
export default function Navbar() {
    return (
        <>
            <div className="shadow-sm">
                <nav>
                    <div className="navbar">
                        <div className="navbar-brand px-2 py-1">
                            <img src="/noBgLogo.png" width={100} />
                            <span className="fw-semibold ms-2 px-2 py-1 border rounded">Admin Portal</span>
                        </div>
                        <div>
                            <NavLinks />
                        </div>

                    </div>
                </nav>
            </div>
        </>
    )
}

function NavLinks() {
    const { setIsAuthenticated } = useAuth();
    const [open, setOpen] = useState(false);
    const toggleNav = () => {
        setOpen(!open);
    }

    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            const result = await axios.get(`${import.meta.env.VITE_API_HOST}/api/admin/logout`, {
                withCredentials: true
            })
            if (result.status >= 200 && result.status < 400) {
                setIsAuthenticated(false)
                navigate('/login')
            }
        } catch (error) {
            alert("Something went wrong try again!!")
            console.log(error);
        }
    }
    return (<>
        <div className="d-md-none">
            <Button onClick={toggleNav}>
                <ViewSidebarIcon />
            </Button>
            <Drawer open={open} onClose={toggleNav}>
                <div className='mx-2 my-1'>
                    <div className='vstack gap-2'>
                        <Link className='border px-2 py-1 rounded shadow-sm btn btn-primary' to={'/'}>Dashboard</Link>
                        <Link className='border px-2 py-1 rounded shadow-sm btn btn-primary' to={'/product'}>Products</Link>
                        <Link className='border px-2 py-1 rounded shadow-sm btn btn-primary' to={'/order'}>Orders</Link>
                        <Link className='border px-2 py-1 rounded shadow-sm btn btn-primary' to={'/user'}>Users</Link>
                        <Link className='border px-2 py-1 rounded shadow-sm btn btn-warning' role='button' type='button' onClick={handleLogout}>Logout</Link>
                    </div>
                </div>
            </Drawer>
        </div>
        <div className="d-none d-md-block me-2">
            <div className='hstack gap-2'>
                <Link className='border px-2 py-1 rounded shadow-sm btn btn-primary' to={'/'}>Dashboard</Link>
                <Link className='border px-2 py-1 rounded shadow-sm btn btn-primary' to={'/product'}>Products</Link>
                <Link className='border px-2 py-1 rounded shadow-sm btn btn-primary' to={'/order'}>Orders</Link>
                <Link className='border px-2 py-1 rounded shadow-sm btn btn-primary' to={'/user'}>Users</Link>
                <Link className='border px-2 py-1 rounded shadow-sm btn btn-warning' role='button' type='button' onClick={handleLogout}>Logout</Link>
            </div>
        </div>
    </>)
}