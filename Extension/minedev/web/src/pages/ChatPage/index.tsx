// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { WiStars } from "react-icons/wi";
import { IoSend } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import Alert from '../../components/Alert';

const messagesTemplate = [
    {
        text: "Welcome to Minedev! How can I assist you today?",
        isBot: true,
        timestamp: "2024-06-09T10:33:06.763Z",
        id: "156"
    },
    {
        text: "Make a python Fibonacci fxn",
        isBot: false,
        timestamp: "2024-06-09T11:33:06.763Z",
        id: "157"
    },
];

  
const ChatPage = ({ vscode }) => {
    const [dataToSend, setDataToSend] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const [messages, setMessages] = useState(messagesTemplate);


    useEffect(() => {
        const handleReceiveMessage = (event) => {
            const message = event.data;
            if (message.command === 'showMessage') {
                setAlertMessage(message.content);
                setShowAlert(true);
            }
        };

        window.addEventListener('message', handleReceiveMessage);

        return () => {
            window.removeEventListener('message', handleReceiveMessage); // Cleanup
        };
    }, []);


    const handleDismissAlert = () => {
        setShowAlert(false);
        setAlertMessage('');
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDataToSend(event.target.value);
    };

    const sendDataToExtension = (data: string) => {
        vscode.postMessage({ command: 'showInfoMessage', data });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        sendDataToExtension(dataToSend);
        setDataToSend('');
    }

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-200 text-gray-800">
            {showAlert && (<Alert onDismiss={handleDismissAlert}>{alertMessage}</Alert>)}
            <div className='flex flex-col justify-start w-full h-full grow overflow-auto'>
                {messages.map((message) => {
                    return message.isBot ? (<div key={message.id} className="flex flex-col justify-start gap-2 bg-gray-200 p-5">
                        <div className='h-7 w-7 rounded-full border-2 border-gray-400 p-1 text-gray-400 flex justify-center items-center'><RiRobot2Line size={40} /></div>
                        <p>{message.text}</p>
                    </div>):(<div key={message.id} className="flex flex-col justify-start gap-2 p-5">
                        <img className="w-7 h-7 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Rounded avatar" />
                        <p>{message.text}</p>
                    </div>);
                })}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center w-full p-5">
                <label htmlFor="voice-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-neutral-400">
                        <WiStars size={23} />
                    </div>
                    <input type="text" value={dataToSend} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter a prompt." required />
                    <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3 text-neutral-400 hover:text-neutral-300">
                        <FaMicrophone />
                    </button>
                </div>
                <button className="inline-flex items-center py-2.5 px-3 ms-2 gap-2  text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
                    Send<IoSend />
                </button>
            </form>

        </div>
    )
}

export default ChatPage;