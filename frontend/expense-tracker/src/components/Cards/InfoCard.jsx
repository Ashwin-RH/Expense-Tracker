import React from 'react'

const InfoCard = ({icon,label,value,color}) => {
  return <div className='flex gap-6 bg-white/50 mt-1 p-6 rounded-2xl shadow-md shadow-black/40 border border-gray-200/50  hover:shadow-xl transition'>
  <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
    {icon}
    </div>
    <div>
      <h6 className='text-sm text-gray-500 mb-1'>{label}</h6>
      <span className='text-[22px]'>₹{value.toLocaleString('en-IN')}</span>
    </div>
    </div>;
  };

export default InfoCard;
