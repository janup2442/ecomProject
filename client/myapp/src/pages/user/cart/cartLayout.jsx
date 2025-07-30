import { Navigate, Outlet } from "react-router";
import {useAuth} from '../../../AuthContext'
export default function CartLayout() {
    const {isAuthenticated} = useAuth();
    return(
        <>
            <div>

                this is cart page layout
            </div>
            <div>
                {
                    isAuthenticated?<Outlet/>:<Navigate  to={'/login'} replace/>
                }
            </div>
        </>
    )
}