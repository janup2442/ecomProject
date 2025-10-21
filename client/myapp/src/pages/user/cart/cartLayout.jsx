import { Navigate, Outlet } from "react-router";
import {useAuth} from '../../../AuthContext'
import Loader from '../../../component/loader'
export default function CartLayout() {
    const {isAuthenticated, isLoading} = useAuth();
    
    if (isLoading) {
        return <Loader message="Checking authentication..." />;
    }
    
    return(
        <>
            <div>

                this is cart page layout
            </div>
            <div>
                {
                    isAuthenticated === true ? <Outlet/> : <Navigate  to={'/login'} replace/>
                }
            </div>
        </>
    )
}