import { ToggleFade } from '../../components/toggle-transition'
import classNames from "classnames";
import Head from "next/head";
import { useState } from "react";
import ReactTextareaAutosize from 'react-textarea-autosize';

export default function Community() {
    const [leftSideOpen, setLeftSideOpen] = useState(false)

    return (
        <div className="w-full h-screen">
            <Head>
                <title>Community - Upzealo</title>
            </Head>

            <div className="flex h-full pt-20">
                <div onMouseEnter={() => setLeftSideOpen(true)} onMouseLeave={() => setLeftSideOpen(false)} className={classNames('hidden pl-8 pt-4 h-[95%] lg:flex flex-col transition-width duration-400 ease overflow-y-auto', {
                    'w-24': leftSideOpen === false,
                    'w-[15rem]': leftSideOpen
                })}>
                    <div className="grid grid-cols-1 gap-y-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(x => (
                            <button className="flex items-center cursor-pointer group">
                                <img key={x} className=" w-10 h-10 rounded-full" src="https://res.cloudinary.com/bahdcoder/image/upload/v1660309950/avatars/No_comments_4.png" alt="community logos" />

                                <ToggleFade show={leftSideOpen}>
                                    <p className="ml-3 font-semibold text-sm group-hover:text-primary-500 transition ease-linear">
                                        DeGods Engineers
                                    </p>
                                </ToggleFade>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="ml-10 bg-black hidden lg:flex lg:w-[14rem] pt-10">
                    <div className="h-[95%] w-full border border-dark-700 rounded-3xl p-6">
                        <img className='mb-6 w-14 h-14' src="https://res.cloudinary.com/bahdcoder/image/upload/v1660309948/avatars/No_Comments-3.png" alt="" />

                        <h3 className='font-bold'>DeGods Engineers</h3>

                        <div className="mt-1 text-xs text-dark-300 flex items-center">
                            <div className="w-[6px] h-[6px] rounded-full bg-primary-500 mr-2"></div> 233 Online
                        </div>

                        <div className="mt-8">
                            <span className="text-xs text-dark-300 uppercase">
                                CHANNELS
                            </span>

                            <div className="mt-4 flex flex-col w-full">
                                <button className='text-primary-500 font-semibold -ml-6 border-l border-primary-500 pl-6 h-8 flex items-center cursor-pointer'>
                                    <span className='mr-1'>#</span> marketplace
                                </button>
                                <button className='text-white mt-2 font-semibold -ml-6 pl-6 h-8 flex items-center cursor-pointer'>
                                    <span className='mr-1'>#</span> floor-check
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ml-6 lg:ml-8 w-full lg:w-auto flex-grow pt-10 h-[88%] lg:h-[95%] mr-6 lg:mr-12">
                    <div className="rounded-3xl bg-dark-700 h-full w-full relative">
                        <div className="px-4 lg:px-8 py-4 lg:py-6 text-white font-bold border-b border-white/10 w-full">
                            #marketplace
                        </div>

                        <div className="flex-grow overflow-y-auto h-[74%] mb-32">

                        </div>

                        <div className="absolute w-full px-6 lg:px-10 bottom-0 pb-6 lg:pb-10">
                            <div className="bg-black rounded-lg flex">
                                <ReactTextareaAutosize className='px-6 py-6 text-xs bg-transparent focus:outline-none placeholder-dark-400 w-full resize-none' placeholder='Type a message' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
