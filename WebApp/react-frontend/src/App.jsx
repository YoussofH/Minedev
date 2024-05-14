import React from 'react';
import LandingPage from './pages/LandingPage';
import VoicePage from './pages/VoicePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext'

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="*" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/voicePage/:conversationId" element={<PrivateRoute><VoicePage /></PrivateRoute>} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App