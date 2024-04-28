import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NativeElementsPage from './pages/NativeElementsPage';
import Layout from './pages/Layout';
import ChatPage from './pages/ChatPage';
import HomePage from './pages/HomePage';

const App = () => {
    return (
        <BrowserRouter>
            <h1>hello</h1>
            <Layout />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/nativeElements" element={<NativeElementsPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App