import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts";

const CustomBarChart = ({data}) => {

    //Function to alternate colors
    const getBarColor=(index)=>{
        return index % 2===0 ? "#c95a0a":"#ba0ac9";
    };

    const CustomTooltip=({active,payload}) => {
        if(active && payload && payload.length){
            return(
                <div className='bg-black/40 shadow-md rounded-lg p-2 border border-gray-300 backdrop-blur-[12px]'>
                    <p className='text-xs font-semibold text-purple-800 mb-1'></p>
                    <p className='text-sm text-white'>
                        Amount :<span className='text-sm font-medium text-white'> ₹ {payload[0].payload.amount}</span>
                    </p>
                </div>
            );
        }
        return null;
    };
  return (
    <div className='bg-transparent mt-6'>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid stroke="none"/>

                <XAxis dataKey="month" tick={{fontSize:12, fill: "white"}} stroke="none"/>
                <YAxis tick={{fontSize: 12,fill: "white"}} stroke="none" />

                <Tooltip content={CustomTooltip}/>

                <Bar
                dataKey="amount"
                fill="#FF8042"
                radius={[10,10,0,0]}
                activeDot={{r:8, fill:"yellow"}}
                activeStyle={{fill:"green"}}
                >
                 {data.map((entry,index)=>(
                    <Cell key={index} fill={getBarColor(index)}/>
                 ))}   
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart
