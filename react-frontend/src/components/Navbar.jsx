import React from 'react';
import logo from '../assets/logo.png';
import { navItems } from '../constants';

const Navbar = () => {
    return (
        <div className="container flex flex-row justify-center my-3 py-2 backdrop:blur-lg mx-auto sticky top-3 z-50">
            <nav className="shadow-lg flex items-center gap-3 px-3 py-3 border text-white rounded-xl ">
                <div className="w-16 logo px-3 cursor-pointer p-2 ">
                    <img src={logo} className="" alt="" />
                </div>
                <ul className="flex flex-row items-center gap-2 p-2 ">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <a href={item.href}
                                className="px-3 backdrop:blur-md hover:backdrop:blur-lg py-3 hover:transparent text-black hover:bg-slate-100 ease-in-out rounded-md transition-all cursor-pointer">
                                {item.label}
                            </a>
                        </li>
                    ))
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Navbar