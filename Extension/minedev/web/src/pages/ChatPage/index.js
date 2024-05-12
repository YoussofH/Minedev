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
const sendRequest_1 = __importDefault(require("../../remote/sendRequest"));
const ChatPage = ({ vscode }) => {
    const [dataToSend, setDataToSend] = (0, react_1.useState)('');
    const [showAlert, setShowAlert] = (0, react_1.useState)(false);
    const [alertMessage, setAlertMessage] = (0, react_1.useState)('');
    const [messages, setMessages] = (0, react_1.useState)(null);
    const handleDismissAlert = () => {
        setShowAlert(false);
        setAlertMessage('');
    };
    const handleInputChange = (event) => {
        setDataToSend(event.target.value);
    };
    const combineAndSortMessages = async (conversationId) => {
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
        combineAndSortMessages(3).then(msgs => {
            setMessages(msgs);
        });
        const handleReceiveMessage = (event) => {
            const message = event.data;
            if (message.command === 'showMessage') {
                setAlertMessage(message.content);
                setShowAlert(true);
            }
        };
        window.addEventListener('message', handleReceiveMessage);
        return () => { window.removeEventListener('message', handleReceiveMessage); };
    }, []);
    const handleSubmit = (event) => {
        event.preventDefault();
        //vsShowInfoMessage(vscode, dataToSend);
        setDataToSend('');
    };
    return (<div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-200 text-gray-800">
            {showAlert && (<Alert_1.default onDismiss={handleDismissAlert}>{alertMessage}</Alert_1.default>)}
            <div className='flex flex-col justify-start w-full h-full grow overflow-auto'>
                {messages?.map((message, index) => {
            return message.isBot ? (<div key={index} className="flex flex-col justify-start gap-2 bg-gray-200 p-5">
                            <div className='h-7 w-7 rounded-full border-2 border-gray-400 p-1 text-gray-400 flex justify-center items-center'><ri_1.RiRobot2Line size={40}/></div>
                            <p>{message.content}</p>
                        </div>) : (<div key={index} className="flex flex-col justify-start gap-2 p-5">
                            <img className="w-7 h-7 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Rounded avatar"/>
                            <p>{message.content}</p>
                        </div>);
        })}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center w-full p-5">
                <label htmlFor="voice-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-neutral-400">
                        <wi_1.WiStars size={23}/>
                    </div>
                    <input type="text" value={dataToSend} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter a prompt." required/>
                    <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3 text-neutral-400 hover:text-neutral-300">
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