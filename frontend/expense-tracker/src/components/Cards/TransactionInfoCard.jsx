import React from 'react'
import {
    LuUtensils,
    LuTrendingUp,
    LuTrendingDown,
    LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({
    title,
    icon,
    date,
    amount,
    type,
    hideDeleteBtn,
    onDelete,
})=>{
    const getAmountStyles = ()=>
        type ==="income" ? "bg-green-100/10 text-green-500" : "bg-red-100/10 text-red-500";
    
  return <div className='group relative flex items-center hover:border-transparent gap-4 mt-2 p-1 md:p-3 rounded-lg hover:bg-gray-600/30 focus:bg-gray-600/30 hover:shadow-md '>
        <div className='p-2 md:p-3  flex items-center justify-center text-xl text-white/80 bg-gray-100/10 rounded-full hover:bg-gray-700 '>
            {icon ? (
                <img src ={icon} alt={title} className='w-6 h-6'/>
            ):(
                <LuUtensils/>
            )}
        </div>

        <div className='flex-1 flex items-center justify-between'>
            <div>
                <p className='text-sm text-white font-medium'>{title}</p>
                <p className=' text-xs text-gray-400 mt-1'>{date}</p>
            </div>

            <div className='flex flex-col md:flex-row items-center gap-2'>
                {!hideDeleteBtn && (
                    <button 
                    type='button'
                    className='md:pl-0 pl-15 text-gray-400 hover:text-red-500 md:opacity-0 md:group-hover:opacity-100 transition-opacity cursor-pointer'
                    onClick={onDelete}>
                        <LuTrash2 size={18} />
                    </button>
                )}

                <div 
                className={`flex items-center gap-2 px-2 py-1 md:px-3 md:py-1.5 rounded-md ${getAmountStyles()}`}
                >
                    <h6 className='text-xs font-medium whitespace-nowrap'>
                        {type === 'income' ? "+" : "-"} ₹ {amount}
                    </h6>
                    {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
                </div>
            </div>
        </div>
  </div>
}

export default TransactionInfoCard;
