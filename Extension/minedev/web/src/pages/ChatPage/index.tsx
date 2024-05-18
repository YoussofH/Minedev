// @ts-nocheck
import React, { useEffect, useState, useContext, useRef } from 'react';
import { WiStars } from "react-icons/wi";
import { IoSend } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import Alert from '../../components/Alert';
import { vsShowInfoMessage, vsOpenLink, vsGetWorkspaceTree } from '../../ReactToVS/api';
import sendRequest from '../../remote/sendRequest';
import Button from '../../components/Button';
import AuthContext from '../../context/AuthContext';


const ChatPage = ({ vscode }) => {
    const [allowAskforTitle, setAllowAskforTitle] = useState(false);
    const [projectTitle, setProjectTitle] = useState("");
    const [workspaceTree, setWorkspaceTree] = useState("");
    const titleSocketRef = useRef(null);

    const [currBotResponse, setCurrBotResponse] = useState("")
    const [showStreamBotResponse, setShowStreamBotResponse] = useState(false)
    const chatSocketRef = useRef(null);

    let { logoutUser } = useContext(AuthContext);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const [conversationId, setConversationId] = useState(4);
    const [dataToSend, setDataToSend] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef<null | HTMLDivElement>(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    useEffect(() => {
        if (allowAskforTitle) {
            titleSocketRef.current.send(JSON.stringify({
                'workspaceTree': workspaceTree,
                'conversationID': conversationId
            }));
        }
        setAllowAskforTitle(false);
    }, [allowAskforTitle]);

    useEffect(() => {
        console.log(projectTitle);
    }, [projectTitle]);

    const handleDismissAlert = () => {
        setShowAlert(false);
        setAlertMessage('');
    };
    const handleInputChange = (event) => {
        setDataToSend(event.target.value);
    };
    const combineAndSortMessages = async () => {
        try {
            const userMessagesResponse = await sendRequest("GET", `/user/prompt?conversation=${conversationId}`);
            const chatbotResponsesResponse = await sendRequest("GET", `/bot/responses?conversation=${conversationId}`);

            const userMessages = userMessagesResponse;
            const chatbotResponses = chatbotResponsesResponse.map((message) => {
                return { ...message, isBot: true };
            });

            const allMessages = [...userMessages, ...chatbotResponses];

            allMessages.sort((a, b) => new Date(a.sent_at) - new Date(b.sent_at));

            return allMessages;
        } catch (error) {
            console.error("Error fetching messages:", error);
            return [];
        }
    }


    useEffect(() => {
        const titleSocket = new WebSocket(
            'ws://'
            + '18.219.38.17:8000'
            + '/ws/title/'
        );
        titleSocketRef.current = titleSocket;
        vsGetWorkspaceTree(vscode);

        titleSocket.addEventListener("open", event => {
            setAllowAskforTitle(true);
        });
        titleSocket.addEventListener("message", event => {
            let data = JSON.parse(event.data)
            if (data.project_title) {
                setProjectTitle(data.project_title);
            }
        });

        const chatSocket = new WebSocket(
            'ws://'
            + '18.219.38.17:8000'
            + '/ws/chat/'
            + conversationId
            + '/'
        );
        chatSocketRef.current = chatSocket;

        // Listen for messages
        chatSocket.addEventListener("message", event => {
            data = JSON.parse(event.data)
            
            if (data.message) {
                setShowStreamBotResponse(true)
                setCurrBotResponse((prev) => prev + data.message)
                scrollToBottom()
            }else{
                console.log(data);
            }

            if (data?.isStreamDone === true) {
                setAlertMessage("Response done!")
                setShowAlert(true)
                setTimeout(setShowAlert(false), 2000);


                combineAndSortMessages().then(msgs => {
                    setMessages(msgs);
                    setCurrBotResponse("")
                    setShowStreamBotResponse(false)
                })
                return
            }
        });

        combineAndSortMessages().then(msgs => {
            setMessages(msgs);
        })

        const handleReceiveMessage = (event) => {
            const message = event.data;
            if (message.command === 'showMessage') {
                setAlertMessage(message.content);
                setShowAlert(true);
            }
            if (message.command === 'sendWorkspaceTree') {
                setWorkspaceTree(message.content);
            }
        };

        window.addEventListener('message', handleReceiveMessage);
        return () => {
            window.removeEventListener('message', handleReceiveMessage);
            chatSocket.removeEventListener('message', chatSocket);
        };
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessages(messages => [...messages, { content: dataToSend }]) // show user prompt
        setShowStreamBotResponse(true)

        sendRequest("POST", `/user/prompt/`, { content: dataToSend, conversation: conversationId }).then(data => {
            //success
        })


        chatSocketRef.current.send(JSON.stringify({
            'user_prompt': dataToSend
        }));

        //vsShowInfoMessage(vscode, dataToSend);
        setDataToSend('');
    }

    const handleMicrophoneClick = () => {
        vsOpenLink(vscode, `http://localhost:3000/voicePage/${conversationId}`)
    }

    return (
        <div className="flex flex-col items-center justify-between w-full min-h-screen bg-gray-50 text-gray-800">
            {showAlert && (<Alert onDismiss={handleDismissAlert}>{alertMessage}</Alert>)}
            <div className="py-3 px-2 flex flex-row justify-between w-full">
                <span class="bg-blue-100 text-blue-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2 my-auto">PRO</span>
                <h3 class="flex items-center text-lg font-extrabold text-gray-800">{projectTitle}</h3>
                <Button variant="logout" onClick={logoutUser}>Logout</Button>
            </div>

            <div className='flex flex-col flex-grow h-0 justify-start min-h-full overflow-y-auto w-full mb-2 pb-2'>
                {messages?.map((message, index) => {
                    return message.isBot ? (
                        <div key={index} className="flex flex-col justify-start gap-2 bg-gray-50 p-3">
                            <div className='h-7 w-7 rounded-full border-2 border-gray-400 p-1 text-gray-400 flex justify-center items-center'><RiRobot2Line size={40} /></div>
                            <p>{message.content}</p>
                        </div>) : (
                        <div key={index} className="flex flex-col justify-start gap-2 p-3">
                            <img className="w-7 h-7 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Rounded avatar" />
                            <p>{message.content}</p>
                        </div>);
                })}
                {showStreamBotResponse && <div className="flex flex-col justify-start gap-2 bg-gray-50 p-3">
                    <div className='h-7 w-7 rounded-full border-2 border-gray-400 p-1 text-gray-400 flex justify-center items-center'><RiRobot2Line size={40} /></div>
                    <p>{currBotResponse}</p>
                </div>}
                <span ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="flex items-center w-full p-5">
                <label htmlFor="voice-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-neutral-400">
                        <WiStars size={23} />
                    </div>
                    <input type="text" value={dataToSend} onChange={handleInputChange} className="text-sm rounded-lg block w-full ps-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white" placeholder="Enter a prompt." required />
                    <button type="button" onClick={handleMicrophoneClick} className="absolute inset-y-0 end-0 flex items-center pe-3 text-neutral-400 hover:text-neutral-300">
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