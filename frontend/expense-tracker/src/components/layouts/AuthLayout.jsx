import React from "react";
import CARD_2 from "../../assets/images/card2.jpg";
import {LuTrendingUpDown } from "react-icons/lu";
import { FaGithub } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from 'react-icons/hi'

const AuthLayout=({ children}) => {
  return <div className="flex">
    {/* Left side: Auth form */}
    <div className="w-screen h-screen md:w-[60vw] bg-gray-950 px-12 pt-8 pb-12 flex flex-col justify-between">
      <div className="flex items-center gap-3 hover:scale-101 duration-500 transtition-all">        
          <img src="/StashUp.png" alt="Logo" className="w-15 h-15 border-2 border-white rounded-full shadow-md shadow-gray-700 "/>
        <a href="/intro" className="text-lg font-medium text-white ">Stash Up</a>
        </div>
        {/* <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-50 h-50 bg-blue-500/10 blur-2xl rounded-full "></div> */}
        {children}
        <div className="text-center text-xs text-gray-400 relative -bottom-6 ">
          &copy; 2025 Ashwin Haragi. All rights reserved.


          <div className=" flex items-center justify-center gap-3 mt-1 text-xs">
          <div className="relative group inline-flex items-center">
          <a
            href="https://github.com/Ashwin-RH"
            aria-label="Visit my GitHub"
            target="_blank"   //📌 Opens the link in a new browser tab.💡 Useful when linking to external sites so users don't leave your app.
            rel="noopener noreferrer" //Prevents new tab from controlling this page (noopener)
                                      //Also prevents the referrer URL (your site) from being sent to the target site.(noreferrer)
            className="flex  items-center  hover:text-gray-100 hover:scale-120 duration-300 transition-transform"
            >
              <FaGithub/>
              </a>
              <span className="absolute right-full mr-3 hidden group-hover:inline bg-gray-800 text-gray-100 text-xs px-4 py-1 pb-1 border border-transparent rounded backdrop-blur-[8px] whitespace-nowrap">
                  GitHub Profile
                </span>
              </div>
            
            <div className="relative group inline-flex items-center">
              <a
                href="https://x.com/Ashwinharagi?t=6FuxoisznsSOeaY1j5zYdA&s=09"
                aria-label="Follow me on X"
                target="_blank"   //📌 Opens the link in a new browser tab.💡 Useful when linking to external sites so users don't leave your app.
                rel="noopener noreferrer" //Prevents new tab from controlling this page (noopener)
                                          //Also prevents the referrer URL (your site) from being sent to the target site.(noreferrer)
                className="flex items-center hover:text-gray-100 hover:scale-120 duration-300 transition-transform"
              >
                <FaXTwitter/>
                </a>
                <span className="absolute  bottom-full mb-6 left-2 -translate-x-1/2 hidden group-hover:inline bg-gray-800 text-gray-100 text-xs px-4 py-1 pb-1 border border-transparent rounded backdrop-blur-[8px] whitespace-nowrap"
                          >
                  Follow me on X
                </span>
              </div>

            <div className="relative group inline-flex items-center">
              <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ashwinharagi@gmail.com"
            target="_blank"   //📌 Opens the link in a new browser tab.💡 Useful when linking to external sites so users don't leave your app.
            rel="noopener noreferrer" //Prevents new tab from controlling this page (noopener)
                                      //Also prevents the referrer URL (your site) from being sent to the target site.(noreferrer)
            className="flex items-center hover:text-gray-100 hover:scale-120 duration-300 transition-transform"
            >
              <HiOutlineMail size={17} />
              </a>
              <span className="absolute  left-full ml-3  hidden group-hover:inline bg-gray-800 text-gray-100 text-xs px-4 py-1 pb-1 border border-transparent rounded backdrop-blur-[8px] whitespace-nowrap"
                          >
                  Email Me
                </span>
              </div>
              </div>
            
        </div>
        </div>

        
       

     {/* Right side: Decorative background image  */}
    <div className="hidden md:block w-[40vw] h-screen bg-gray-950 bg-auth-bg-img bg-no-repeat bg-center overflow-hidden p-8 relative">
        <div className="w-48 h-48 rounded-[40px] bg-blue-500/10 blur-2xl absolute -top-7 left-20 shadow-md shadow-purple-500/40 border border-purple-300/50" />
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600/50 blur-xl absolute top-[30%] -right-10 shadow-lg shadow-fuchsia-600/40 " />
        <div className="w-48 h-48 rounded-[40px] bg-violet-500/20 blur-2xl absolute -bottom-5 left-20 shadow-md shadow-violet-500/40 border border-violet-300/50" />

        <div className="grid grid-cols-1 z-20 ">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="4,30,000"
            color="bg-indigo-500/80 shadow-lg shadow-gray-900"
          />
        </div>


        <img
        src={CARD_2}
        className="w-64 rounded-[20px] lg:w-[90%] absolute bottom-15 shadow-lg shadow-blue-400/15 hover:scale-105 duration-500 opacity-80 transition-all"
        />

        </div>
    </div>;
};

export default AuthLayout;

const StatsInfoCard = ({icon,label,value,color}) => {
    return <div className="flex gap-6 bg-gray-800/40 p-4 rounded-3xl shadow-xl shadow-blue-500/10 border border-gray-700/50 z-10 hover:bg-gray-700/40 hover:scale-105 duration-500 backdrop-blur-md transition-all">
      <div
        className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl backdrop-blur-[8px]`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-white mb-1">{label}</h6>
        <span className="text-[20px] text-white">₹{value}</span>
      </div>
    </div>
}       
