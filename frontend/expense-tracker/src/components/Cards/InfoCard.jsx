import React from 'react';

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100/20 hover:shadow-lg hover:shadow-gray-400/30 hover:scale-105 duration-500 transition-transform">
      <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
        {icon}
      </div>
      <div>
        <h6 className="text-sm text-white mb-1">{label}</h6>
        <span className="text-[22px] text-white">₹{value.toLocaleString('en-IN')}</span>
      </div>
    </div>
  );
};

export default InfoCard;
