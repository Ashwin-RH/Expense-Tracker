import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import { prepareExpenseLineChartData } from '../../utils/helper';
import CustomLineChart from '../Charts/CustomLineChart';

const ExpenseOverview = ({transactions, onExpenseIncome}) => {
    const [chartData,setChartData] = useState([]);

    useEffect(() => {
        const result=prepareExpenseLineChartData(transactions);
        setChartData(result);

        return () => {};
    },[transactions]);
  return <div className='card'>
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0">
  <div className="flex flex-col">
    <h5 className="text-lg text-white">Expense Overview</h5>
    <p className="text-xs text-gray-300 mt-0.5">
      Tracking your spending trends over time and gain insights into where your money goes.
    </p>
  </div>

   <div className="flex justify-end md:justify-normal">
    <button 
      className="add-btn w-[60%] md:w-auto flex items-center justify-center gap-1 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
      onClick={onExpenseIncome}
    >
      <LuPlus className="text-lg" />
      Add Expense
    </button>
  </div>
</div>


    <div className='mt-10'>
        <CustomLineChart data={chartData} />
    </div>
  </div>
}

export default ExpenseOverview
