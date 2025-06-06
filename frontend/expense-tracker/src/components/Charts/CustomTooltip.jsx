import React from 'react'

// this is the func for value u see while hovering the pie chart
const CustomTooltip = ({ active, payload }) => {
    
    // Show tooltip only if it's active and has payload data
    if (active && payload && payload.length) {
        return (
            // Tooltip container styling
            <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
                
                {/* Label for the data point */}
                <p className='text-xs font-semibold text-purple-800 mb-1'>
                    {payload[0].name}
                </p>

                {/* Display the amount */}
                <p className='text-sm text-gray-600'>       
                    Amount:{" "}
                    <span className='text-sm font-medium text-gray-900'>  
                        ₹{payload[0].value}                               
                    </span>
                </p>
            </div> 
        );
    }

    // If not active, render nothing
    return null;
}

export default CustomTooltip

/*🧩 Component: CustomTooltip
🔍 Purpose
This component defines a custom tooltip for a Pie Chart in Recharts. It shows useful information when the user hovers over a chart segment.

⚙️ How It Works
Props:
active: Boolean, indicates if the tooltip is visible.
payload: Array, contains data for the hovered chart segment.

Logic:
If active and payload exist and are valid:
Shows a tooltip box with:
payload[0].name: The name/label of the data point.
payload[0].value: The amount/number, prefixed with ₹.

If not active, returns null (nothing is rendered).

🎨 Styling (Tailwind CSS)
bg-white, shadow-md, rounded-lg, border – gives the tooltip a clean card-like appearance.
Font styling for name and value is applied for clarity and emphasis.

✅ Example Output (on hover)
Total Expense
Amount: ₹1500 */