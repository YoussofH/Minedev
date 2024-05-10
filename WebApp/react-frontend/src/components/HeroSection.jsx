import React from 'react';
import Button from './Button';

const HeroSection = () => {
    return (
        <div className='flex justify-center mt-8'>
            <div className="border lg:w-1/2 mx-8 flex justify-center rounded-xl flex-col items-center lg:p-20 p-10 gap-7 bg-gray-50">
                <h1 className="lg:text-6xl md:text-5xl text-4xl font-medium leading-none tracking-wide text-gray-900 text-center">
                    Leverage the power of AI in your web automation
                </h1>
                <p className="mb-6 lg:text-2xl text-xl font-normal text-gray-500 text-center mx-12">
                    Enhance and simplify your browser automation using our AI-enabled SDK. With Bytebot, creating web tasks is as easy as writing a prompt.
                </p>
                <Button>Learn More</Button>

            </div>
        </div>
    )
}

export default HeroSection