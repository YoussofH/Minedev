import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({children, ...rest}) => {
    let { isAuthenticated } = useContext(AuthContext)

    return !isAuthenticated ? <Navigate to='/login'/> : children;
}

export default PrivateRoute;