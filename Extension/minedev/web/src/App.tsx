import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

declare function acquireVsCodeApi(): any;
const vscode = acquireVsCodeApi();


const App = () => {

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="*" element={<PrivateRoute><ChatPage vscode={vscode} /></PrivateRoute>} />
                    <Route path="/chat" element={<PrivateRoute><ChatPage vscode={vscode} /></PrivateRoute>} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App