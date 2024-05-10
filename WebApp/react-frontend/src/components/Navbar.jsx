import React, { useState, useContext } from 'react'
import logo from '../assets/logo.png';
import { navItems } from '../constants';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext'

const Navbar = () => {
    let { user, logoutUser } = useContext(AuthContext);

    const isAuthenticated = false;
    const navigate = useNavigate();

    const goToRoute = (routeName) => {
        navigate(routeName);
    };

    return (
        <div className="container flex flex-row justify-center my-3 py-2 backdrop:blur-lg mx-auto sticky top-3 z-50">
            <nav className="shadow-lg flex items-center gap-3 px-3 py-3 border text-white rounded-xl w-full lg:w-2/3 justify-between mx-6 bg-white">
                <div className="w-16 logo px-3 cursor-pointer ">
                    <img src={logo} className="" alt="" />
                </div>
                <ul className="flex flex-row items-center gap-2 p-2 ">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <button onClick={() => goToRoute(item.route)}
                                className="text-base px-3 backdrop:blur-md hover:backdrop:blur-lg py-3 hover:transparent text-black hover:bg-slate-100 ease-in-out rounded-md transition-all cursor-pointer">
                                {item.label}
                            </button>
                        </li>
                    ))
                    }
                </ul>
                <div className='flex gap-2'>
                    {user} ? (
                        <Button variant='light' onClick={logoutUser}>Logout</Button>
                    ):(
                        <Button variant='light' onClick={() => goToRoute("login")}>Login</Button>
                        <Button>Get Started</Button>
                    )

                </div>
            </nav>
        </div>
    )
}

export default Navbar