import React from 'react';
import { pricingOptions } from '../constants';
import { FaAsterisk } from "react-icons/fa6";
import { PiStarFour } from "react-icons/pi";
import Button from './Button';

const PricingSection = () => {
    return (
        <div className='flex justify-center mt-10'>
            <div className="border lg:w-2/3 mx-8 flex justify-center rounded-xl flex-col items-center lg:p-10 p-5 gap-7">
                <div className='bg-slate-100 rounded-full px-3 py-1 border-2 border-slate-400'>
                    <FaAsterisk size={22} />
                </div>
                <h1 class="lg:text-6xl text-4xl font-medium leading-none tracking-wide text-gray-900 text-center">
                    Pricing
                </h1>
                <p class="lg:text-2xl text-xl font-normal text-gray-500 text-center mx-12">
                    Choose the plan that's right for you. Whether you're tinkering or looking to scale up, we have a pricing model to fit your needs.
                </p>
                <p class="lg:text-2xl text-xl font-normal text-gray-500 text-center mx-12">
                    Free trial of 25 Smart Requests and 1k Cached Requests.
                </p>
                <section class="bg-white">
                    <div class="py-6 px-4 w-full">
                        <div class="grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-4">
                            {pricingOptions.map((offer, index) => (
                                <div class={`flex flex-col ${offer.class} col-span-1 justify-between p-6 mx-auto w-full text-center text-gray-900 bg-gray-50 rounded-lg border border-gray-100 shadow`}>
                                    <h3 class="mb-4 text-2xl font-semibold">{offer.title}</h3>
                                    <p class="font-light text-gray-500 sm:text-lg">{offer.tip}</p>
                                    <div class="flex justify-center items-baseline my-8">
                                        <span class="mr-2 text-5xl font-extrabold">{offer.price}</span>
                                        <span class="text-gray-500">/month</span>
                                    </div>
                                    {/* list */}
                                    <ul class="mb-8 text-left">
                                        {offer.features.map((feature, index) => (
                                            <li key={index} class="flex items-center space-x-3 w-64">
                                                <PiStarFour size={22} />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button>Get Started</Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}

export default PricingSection