import React from 'react';
import Button from './Button';

const HeroSection = () => {
    return (
        <div className='flex justify-center mt-8'>
            <div className="border lg:w-4/5 lg:mx-8 mx-4 flex justify-center rounded-xl flex-col items-center lg:p-20 p-5 gap-7 bg-gray-50">
                <h1 className="lg:text-6xl md:text-5xl text-4xl font-medium leading-none tracking-wide text-gray-900 text-center">
                    ChatGPT can't answer questions about your codebase, but <span className='text-sky-600'>Minedev</span> can.
                </h1>
                <p className="mb-6 lg:text-2xl text-xl font-normal text-gray-500 text-center mx-12">
                    Enhance and simplify your development process using our AI-enabled VS Code extension. With Minedev, programming is as easy as writing a prompt.
                </p>
                <Button>Learn More</Button>

            </div>
        </div>
    )
}

export default HeroSection