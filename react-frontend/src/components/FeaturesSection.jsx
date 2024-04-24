import React from 'react';
import { RiSparkling2Fill } from "react-icons/ri";
import { features } from '../constants';


const FeaturesSection = () => {
    return (
        <div className='flex justify-center mt-20'>
            <div className="border w-2/3 flex justify-center rounded-xl flex-col items-center lg:p-20 p-10 gap-7">
                <div className='bg-slate-100 rounded-full px-3 py-1 border-2 border-slate-400'>
                    <RiSparkling2Fill size={22} />
                </div>
                <h1 class="lg:text-6xl text-4xl font-medium leading-none tracking-wide text-gray-900 text-center">
                    Features
                </h1>
                <p class="mb-6 lg:text-2xl text-xl font-normal text-gray-500 text-center mx-12">
                    Streamline your web workflow with AI. Get all the capabilities, without the complexity.
                </p>
                <div className="flex justify-center gap-10 flex-col">
                    {features.map((feature, index) => (
                        index % 2 == 0 ? (
                            <div key={index} className="flex justify-center bg-neutral-900 rounded-xl pt-10 pl-16 gap-10">
                                <div className="flex flex-col gap-5 justify-center">
                                    <div className='bg-slate-100 rounded-full px-3 py-1 border-2 border-slate-400 flex flex-row gap-3 w-44 justify-center items-center'>
                                        {feature.icon}
                                        <span>
                                            {" "}
                                            {feature.tagText}
                                        </span>
                                    </div>
                                    <h3 class="lg:text-4xl text-3xl font-medium leading-none tracking-wide text-neutral-200">
                                        {feature.title}
                                    </h3>
                                    <p class="mb-6 lg:text-2xl text-xl font-thin text-neutral-300">
                                        {feature.description}
                                    </p>
                                </div>
                                <div>
                                    <img src={feature.image} className='h-full' alt="code feature" />
                                </div>
                            </div>
                        ) : (
                            <div key={index} className="flex justify-center bg-neutral-900 rounded-xl pt-10 pr-16 gap-10">
                                <div>
                                    <img src={feature.image} className='h-full' alt="code feature" />
                                </div>
                                <div className="flex flex-col gap-5 justify-center">
                                    <div className='bg-slate-100 rounded-full px-3 py-1 border-2 border-slate-400 flex flex-row gap-3 w-44 justify-center items-center'>
                                        {feature.icon}
                                        <span>
                                            {" "}
                                            {feature.tagText}
                                        </span>
                                    </div>
                                    <h3 class="lg:text-4xl text-3xl font-medium leading-none tracking-wide text-neutral-200">
                                        {feature.title}
                                    </h3>
                                    <p class="mb-6 lg:text-2xl text-xl font-thin text-neutral-300">
                                        {feature.description}
                                    </p>
                                </div>

                            </div>
                        )
                    ))}
                </div>

            </div>
        </div>
    )
}

export default FeaturesSection