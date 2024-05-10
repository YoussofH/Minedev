import React, {useContext} from 'react'
import logo from '../../assets/logo.png';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {

    let { signupUser } = useContext(AuthContext);
    const navigate = useNavigate();
    
    return (
        <section className="bg-gray-50 min-h-screen">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                    <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                        Minedev
                </a>
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={signupUser}>
                            <div>
                                <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900">Your full name</label>
                                <input type="text" name="fullname" id="fullname" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5" placeholder="Your name here" required />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5" required />
                            </div>
                            <button type="submit" className="w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign in</button>
                            <p className="text-sm font-light text-gray-500">
                                Already have an account? <button href="#" onClick={()=>navigate("/login")} className="font-medium text-sky-600 hover:underline">Login</button>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignupPage