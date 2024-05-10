import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sendRequest from '../remote/sendRequest';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {

    let [isAuthenticated, setIsAuthenticated] = useState(() => (localStorage.getItem('authTokens') ? true : false))
    let [authTokens, setAuthTokens] = useState(() => (localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null))

    const navigate = useNavigate();

    let signupUser = async (e) => {
        e.preventDefault()

        await sendRequest("POST", "/user/register/", { fullname: e.target.fullname.value, email: e.target.email.value, password: e.target.password.value }, false)
            .then((response) => {
                navigate('/login');
            }).catch((error) => {
                console.log("Something went wrong with signup");
                console.log(error);
            });
    }
    let loginUser = async (e) => {
        e.preventDefault()

        await sendRequest("POST", "/user/token/", { email: e.target.email.value, password: e.target.password.value }, false)
            .then((response) => {
                    localStorage.setItem('authTokens', JSON.stringify(response.data));
                    setAuthTokens(response.data);
                    setIsAuthenticated(true);
                    navigate('/');
            }).catch((error) => {
                console.log("Something went wrong with login");
                console.log(error);
            });
    }

    let logoutUser = (e) => {
        e.preventDefault();
        localStorage.removeItem('authTokens');
        setAuthTokens(null);
        setIsAuthenticated(false);
        navigate('/');
    }

    let contextData = {
        isAuthenticated: isAuthenticated,
        authTokens: authTokens,
        signupUser: signupUser,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}