import React from 'react'
import Navbar from '../../components/Navbar'
import HeroSection from '../../components/HeroSection'
import FeaturesSection from '../../components/FeaturesSection'
import PricingSection from '../../components/PricingSection'
import NewsletterSection from '../../components/NewsletterSection'

const LandingPage = () => {
    return (
        <>
            <Navbar />
            <HeroSection />
            <FeaturesSection />
            <PricingSection />
            <NewsletterSection />
        </>
    )
}

export default LandingPage