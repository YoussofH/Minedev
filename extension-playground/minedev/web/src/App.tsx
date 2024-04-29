import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NativeElementsPage from './pages/NativeElementsPage';
import ChatPage from './pages/ChatPage';
import HomePage from './pages/HomePage';

declare function acquireVsCodeApi(): any;
const vscode = acquireVsCodeApi();


const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='*' element={<HomePage />} />
                <Route path="/chat" element={<ChatPage vscode={vscode} />} />
                <Route path="/nativeElements" element={<NativeElementsPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App