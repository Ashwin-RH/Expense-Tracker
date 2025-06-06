import React from "react";
import CARD_2 from "../../assets/images/card2.jpg";
import {LuTrendingUpDown } from "react-icons/lu";

const AuthLayout=({ children}) => {
  return <div className="flex">
    {/* Left side: Auth form */}
    <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black ">Expense Tracker</h2>
        {children}
       </div> 

     {/* Right side: Decorative background image  */}
    <div className="hidden md:block w-[40vw] h-screen bg-violet-100 bg-auth-bg-img bg-no-repeat bg-center overflow-hidden p-8 relative shadow-md shadow-violet-500/40">
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5 shadow-md shadow-purple-500/40 border border-purple-300/50" />
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10 shadow-lg shadow-fuchsia-600/40 " />
        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-5 -left-5 shadow-md shadow-violet-500/40 border border-violet-300/50" />

        <div className="grid grid-cols-1 z-20">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="4,30,000"
            color="bg-primary"
          />
        </div>


        <img
        src={CARD_2}
        className="w-64 rounded-[20px] lg:w-[90%] absolute bottom-15 shadow-lg shadow-blue-400/15"
        />

        </div>
    </div>;
};

export default AuthLayout;

const StatsInfoCard = ({icon,label,value,color}) => {
    return <div className="flex gap-6 bg-white p-4 rounded-3xl shadow-xl shadow-purple-400/40 border border-gray-200/50 z-10">
      <div
        className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px]">₹{value}</span>
      </div>
    </div>
}       