import React from 'react';
import LandingPage from './pages/LandingPage';
import VoicePage from './pages/VoicePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/voicePage" element={<VoicePage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App