import React, { useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../Charts/CustomBarChart';
import { prepareIncomebarChartData } from '../../utils/helper';

const IncomeOverview = ({transactions, onAddIncome}) => {
    const [chartData,setChartData] = useState([])

    useEffect(()=>{
        const result=prepareIncomebarChartData(transactions);
        setChartData(result);

        return () =>{};
    },[transactions]);
  return <div className='card'>
    <div className='flex items-center justify-between'>
        <div className=''>
            <h5 className='text-lg text-white'>Income Overview</h5>
            <p className='text-xs text-gray-300 mt-0.5'>
                Track your earnings over time and analyse your income trends.
            </p>
        </div>

        <button className='add-btn' onClick={onAddIncome}>
            <LuPlus className='text-lg'/>
            Add Income
        </button>
    </div>

    <div className='mt-10'>
        <CustomBarChart data={chartData}/>
    </div>

  </div>
}

export default IncomeOverview;
