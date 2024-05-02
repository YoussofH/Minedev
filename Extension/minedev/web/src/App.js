"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const NativeElementsPage_1 = __importDefault(require("./pages/NativeElementsPage"));
const ChatPage_1 = __importDefault(require("./pages/ChatPage"));
const HomePage_1 = __importDefault(require("./pages/HomePage"));
const vscode = acquireVsCodeApi();
const App = () => {
    return (<react_router_dom_1.BrowserRouter>
            <react_router_dom_1.Routes>
                <react_router_dom_1.Route path='/' element={<HomePage_1.default />}/>
                <react_router_dom_1.Route path="*" element={<ChatPage_1.default vscode={vscode}/>}/>
                <react_router_dom_1.Route path="/chat" element={<ChatPage_1.default vscode={vscode}/>}/>
                <react_router_dom_1.Route path="/nativeElements" element={<NativeElementsPage_1.default />}/>
            </react_router_dom_1.Routes>
        </react_router_dom_1.BrowserRouter>);
};
exports.default = App;
//# sourceMappingURL=App.js.map