import React from 'react';
import { WiStars } from "react-icons/wi";
import { IoSend } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";

const ChatPage = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-200 text-gray-800">
            <div className='flex flex-col justify-start w-full h-full grow overflow-auto'>
                <div className="flex flex-col justify-start gap-2 bg-gray-300 p-5">
                    <img className="w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Rounded avatar" />
                    <p>Welcome to Minedev! How can I assist you today?</p>
                </div>
                <div className="flex flex-col justify-start gap-2 p-5">
                    <img className="w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Rounded avatar" />
                    <p>Make a python fibonaci functions</p>
                </div>
            </div>

            <div className="flex items-center w-full p-5">
                <label htmlFor="voice-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-neutral-400">
                        <WiStars size={23} />
                    </div>
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter a prompt." required />
                    <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3 text-neutral-400 hover:text-neutral-300">
                        <FaMicrophone />
                    </button>
                </div>
                <button className="inline-flex items-center py-2.5 px-3 ms-2 gap-2  text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Send<IoSend />
                </button>
            </div>

        </div>
    )
}

export default ChatPage;