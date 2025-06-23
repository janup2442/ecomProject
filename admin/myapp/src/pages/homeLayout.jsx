import { Outlet, Link } from "react-router";


export default function Home() {
    const handleClick = () => {
        localStorage.removeItem('adminToken')
    }
    return (

        <>
            <div>
                <div>
                    <div className="navbar">
                        <p className="navbar-brand">Admin Portal</p>

                        <div>
                            <div className="hstack gap-2">
                                <Link to={'/'}>Dashboard</Link>
                                <Link to={'product'}>Product</Link>
                                <Link to={'user'}>User</Link>
                                <Link to={'order'}>Order</Link>
                                <Link to={'/login'} onClick={handleClick}>Log Out</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </>
    )
}