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
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0">
  <div>
    <h5 className="text-lg text-white">Income Overview</h5>
    <p className="text-xs text-gray-300 mt-0.5">
      Track your earnings over time and analyse your income trends.
    </p>
  </div>

  <div className="flex justify-end md:justify-normal">
    <button 
      className="add-btn w-[60%] md:w-auto flex items-center justify-center gap-1 px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white transition"
      onClick={onAddIncome}
    >
      <LuPlus className="text-lg" />
      Add Income
    </button>
  </div>
</div>


    <div className='mt-10'>
        <CustomBarChart data={chartData}/>
    </div>

  </div>
}

export default IncomeOverview;
