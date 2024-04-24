import React from 'react'
import Button from './Button'

const HeroSection = () => {
    return (
        <div className='flex justify-center mt-12'>
            <div className="border w-2/3 flex justify-center rounded-xl flex-col items-center lg:p-20 p-10 gap-7 bg-gray-200">
                <h1 class="lg:text-6xl text-4xl font-extrabold leading-none tracking-tight text-gray-900 text-center">
                    Leverage the power of AI in your web automation
                </h1>
                <p class="mb-6 lg:text-2xl text-xl font-normal text-gray-500 text-center mx-12">
                    Enhance and simplify your browser automation using our AI-enabled SDK. With Bytebot, creating web tasks is as easy as writing a prompt.
                </p>
                <Button>Learn More</Button>

            </div>
        </div>
    )
}

export default HeroSection