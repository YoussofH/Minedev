import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import PricingSection from './components/PricingSection';

const App = () => {
    return (
        <>
            <Navbar />
            <HeroSection />
            <FeaturesSection />
            <PricingSection />
        </>
    )
}

export default App