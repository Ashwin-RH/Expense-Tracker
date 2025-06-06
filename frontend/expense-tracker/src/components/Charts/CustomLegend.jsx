import React from 'react'

// this is the custom legend component for the pie chart
const CustomLegend = ({ payload }) => {
  return (
    // Flex container for the legend items
    <div className='flex flex-wrap justify-center gap-2 mt-4 space-x-6'>

      {/* Loop through each entry in the payload to render legend items */}
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className='flex items-center space-x-2'>

          {/* Colored dot representing the data category */}
          <div 
            className='w-2.5 h-2.5 rounded-full'
            style={{ backgroundColor: entry.color }}
          ></div>

          {/* Label for the data category */}
          <span className='text-xs text-gray-700 font-medium'>
            {entry.value}
          </span>
        </div>
      ))}
      
    </div>
  )
}

export default CustomLegend

/*✅ Example Output
You’ll see something like:
🔵 Total Balance
🔴 Total Expense
🟠 Total Income*/