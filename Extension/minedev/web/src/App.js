"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const ChatPage_1 = __importDefault(require("./pages/ChatPage"));
const LoginPage_1 = __importDefault(require("./pages/LoginPage"));
const PrivateRoute_1 = __importDefault(require("./utils/PrivateRoute"));
const AuthContext_1 = require("./context/AuthContext");
const vscode = acquireVsCodeApi();
const App = () => {
    return (<react_router_dom_1.BrowserRouter>
            <AuthContext_1.AuthProvider>
                <react_router_dom_1.Routes>
                    <react_router_dom_1.Route path="/" element={<PrivateRoute_1.default><ChatPage_1.default vscode={vscode}/></PrivateRoute_1.default>}/>
                    <react_router_dom_1.Route path="/chat" element={<PrivateRoute_1.default><ChatPage_1.default vscode={vscode}/></PrivateRoute_1.default>}/>
                    <react_router_dom_1.Route path="*" element={<LoginPage_1.default />}/>
                    <react_router_dom_1.Route path="/login" element={<LoginPage_1.default />}/>
                </react_router_dom_1.Routes>
            </AuthContext_1.AuthProvider>
        </react_router_dom_1.BrowserRouter>);
};
exports.default = App;
//# sourceMappingURL=App.js.map