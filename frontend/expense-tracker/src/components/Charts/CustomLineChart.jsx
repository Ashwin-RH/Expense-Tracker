import React from 'react'
import {XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart} from "recharts"
import CustomTooltip from './CustomTooltip'

const CustomLineChart = ({data}) => {

    const CustomTooltip= ({active, payload}) => {
        if(active && payload && payload.length){
            return (
                <div className='bg-black/40 shadow-md rounded-lg p-2 border border-gray-300 backdrop-blur-[2px]'>
                    <p className='text-xs font-semibold text-white mb-1'>{payload[0].payload.category}</p>
                    <p className='text-sm text-white'>
                        Amount: <span className='text-sm font-medium text-white'>₹{payload[0].payload.amount}</span>
                    </p>
                </div>
            )
            }
        return null;
    };

  return <div className='bg-transparent '>
    <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
        <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor='#875cf5' stopOpacity={0.4}/>
                <stop offset="95%" stopColor='#875cf5' stopOpacity={0}/>
            </linearGradient>
        </defs>

        <CartesianGrid stroke="none"/>
        <XAxis dataKey="month" tick={{fontSize: 12, fill:"white"}} stroke="none"/>
         <YAxis  tick={{fontSize: 12, fill:"white"}} stroke="none"/>
         <Tooltip content={<CustomTooltip />} />

         <Area type="monotone" dataKey="amount" stroke='#875cf5' fill="url(#incomeGradient)" strokeWidth={3} dot={{r: 3, fill: "#ab8df8"}} />
        </AreaChart>
    </ResponsiveContainer>
  </div>
};

export default CustomLineChart
