"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const react_1 = __importStar(require("react"));
const wi_1 = require("react-icons/wi");
const io5_1 = require("react-icons/io5");
const fa_1 = require("react-icons/fa");
const ri_1 = require("react-icons/ri");
const Alert_1 = __importDefault(require("../../components/Alert"));
const api_1 = require("../../ReactToVS/api");
const sendRequest_1 = __importDefault(require("../../remote/sendRequest"));
const Button_1 = __importDefault(require("../../components/Button"));
const AuthContext_1 = __importDefault(require("../../context/AuthContext"));
const ChatPage = ({ vscode }) => {
    const [allowAskforTitle, setAllowAskforTitle] = (0, react_1.useState)(false);
    const [projectTitle, setProjectTitle] = (0, react_1.useState)("");
    const [workspaceTree, setWorkspaceTree] = (0, react_1.useState)("");
    const titleSocketRef = (0, react_1.useRef)(null);
    const [currBotResponse, setCurrBotResponse] = (0, react_1.useState)("");
    const [showStreamBotResponse, setShowStreamBotResponse] = (0, react_1.useState)(false);
    const chatSocketRef = (0, react_1.useRef)(null);
    let { logoutUser } = (0, react_1.useContext)(AuthContext_1.default);
    const [showAlert, setShowAlert] = (0, react_1.useState)(false);
    const [alertMessage, setAlertMessage] = (0, react_1.useState)('');
    const [conversationId, setConversationId] = (0, react_1.useState)(4);
    const [dataToSend, setDataToSend] = (0, react_1.useState)('');
    const [messages, setMessages] = (0, react_1.useState)([]);
    const messagesEndRef = (0, react_1.useRef)(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    (0, react_1.useEffect)(() => {
        scrollToBottom();
    }, [messages]);
    (0, react_1.useEffect)(() => {
        if (allowAskforTitle) {
            titleSocketRef.current.send(JSON.stringify({
                'workspaceTree': workspaceTree,
                'conversationID': conversationId
            }));
        }
        setAllowAskforTitle(false);
    }, [allowAskforTitle]);
    (0, react_1.useEffect)(() => {
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
            const userMessagesResponse = await (0, sendRequest_1.default)("GET", `/user/prompt?conversation=${conversationId}`);
            const chatbotResponsesResponse = await (0, sendRequest_1.default)("GET", `/bot/responses?conversation=${conversationId}`);
            const userMessages = userMessagesResponse;
            const chatbotResponses = chatbotResponsesResponse.map((message) => {
                return { ...message, isBot: true };
            });
            const allMessages = [...userMessages, ...chatbotResponses];
            allMessages.sort((a, b) => new Date(a.sent_at) - new Date(b.sent_at));
            return allMessages;
        }
        catch (error) {
            console.error("Error fetching messages:", error);
            return [];
        }
    };
    (0, react_1.useEffect)(() => {
        const titleSocket = new WebSocket('ws://'
            + '18.219.38.17:8000'
            + '/ws/title/');
        titleSocketRef.current = titleSocket;
        (0, api_1.vsGetWorkspaceTree)(vscode);
        titleSocket.addEventListener("open", event => {
            setAllowAskforTitle(true);
        });
        titleSocket.addEventListener("message", event => {
            let data = JSON.parse(event.data);
            if (data.project_title) {
                setProjectTitle(data.project_title);
            }
        });
        const chatSocket = new WebSocket('ws://'
            + '18.219.38.17:8000'
            + '/ws/chat/'
            + conversationId
            + '/');
        chatSocketRef.current = chatSocket;
        // Listen for messages
        chatSocket.addEventListener("message", event => {
            data = JSON.parse(event.data);
            if (data.message) {
                setShowStreamBotResponse(true);
                setCurrBotResponse((prev) => prev + data.message);
                scrollToBottom();
            }
            else {
                console.log(data);
            }
            if (data?.isStreamDone === true) {
                setAlertMessage("Response done!");
                setShowAlert(true);
                setTimeout(setShowAlert(false), 2000);
                combineAndSortMessages().then(msgs => {
                    setMessages(msgs);
                    setCurrBotResponse("");
                    setShowStreamBotResponse(false);
                });
                return;
            }
        });
        combineAndSortMessages().then(msgs => {
            setMessages(msgs);
        });
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
        setMessages(messages => [...messages, { content: dataToSend }]); // show user prompt
        setShowStreamBotResponse(true);
        (0, sendRequest_1.default)("POST", `/user/prompt/`, { content: dataToSend, conversation: conversationId }).then(data => {
            //success
        });
        chatSocketRef.current.send(JSON.stringify({
            'user_prompt': dataToSend
        }));
        //vsShowInfoMessage(vscode, dataToSend);
        setDataToSend('');
    };
    const handleMicrophoneClick = () => {
        (0, api_1.vsOpenLink)(vscode, `http://localhost:3000/voicePage/${conversationId}`);
    };
    return (<div className="flex flex-col items-center justify-between w-full min-h-screen bg-gray-50 text-gray-800">
            {showAlert && (<Alert_1.default onDismiss={handleDismissAlert}>{alertMessage}</Alert_1.default>)}
            <div className="py-3 px-2 flex flex-row justify-between w-full">
                <span class="bg-blue-100 text-blue-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2 my-auto">PRO</span>
                <h3 class="flex items-center text-lg font-extrabold text-gray-800">{projectTitle}</h3>
                <Button_1.default variant="logout" onClick={logoutUser}>Logout</Button_1.default>
            </div>

            <div className='flex flex-col flex-grow h-0 justify-start min-h-full overflow-y-auto w-full mb-2 pb-2'>
                {messages?.map((message, index) => {
            return message.isBot ? (<div key={index} className="flex flex-col justify-start gap-2 bg-gray-50 p-3">
                            <div className='h-7 w-7 rounded-full border-2 border-gray-400 p-1 text-gray-400 flex justify-center items-center'><ri_1.RiRobot2Line size={40}/></div>
                            <p>{message.content}</p>
                        </div>) : (<div key={index} className="flex flex-col justify-start gap-2 p-3">
                            <img className="w-7 h-7 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Rounded avatar"/>
                            <p>{message.content}</p>
                        </div>);
        })}
                {showStreamBotResponse && <div className="flex flex-col justify-start gap-2 bg-gray-50 p-3">
                    <div className='h-7 w-7 rounded-full border-2 border-gray-400 p-1 text-gray-400 flex justify-center items-center'><ri_1.RiRobot2Line size={40}/></div>
                    <p>{currBotResponse}</p>
                </div>}
                <span ref={messagesEndRef}/>
            </div>

            <form onSubmit={handleSubmit} className="flex items-center w-full p-5">
                <label htmlFor="voice-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-neutral-400">
                        <wi_1.WiStars size={23}/>
                    </div>
                    <input type="text" value={dataToSend} onChange={handleInputChange} className="text-sm rounded-lg block w-full ps-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white" placeholder="Enter a prompt." required/>
                    <button type="button" onClick={handleMicrophoneClick} className="absolute inset-y-0 end-0 flex items-center pe-3 text-neutral-400 hover:text-neutral-300">
                        <fa_1.FaMicrophone />
                    </button>
                </div>
                <button className="inline-flex items-center py-2.5 px-3 ms-2 gap-2  text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
                    Send<io5_1.IoSend />
                </button>
            </form>

        </div>);
};
exports.default = ChatPage;
//# sourceMappingURL=index.js.map