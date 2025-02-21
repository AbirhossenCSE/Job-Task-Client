import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/Authcontext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className='flex min-h-screen justify-center items-center'>
            <span className="loading loading-infinity loading-lg"></span>
        </div>
    }

    if (user && user?.email) {
        return children;
    }

    return <Navigate state={location.pathname} to={'/signin'}></Navigate>
};

export default PrivateRoute;