import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

const CustomPieChart = ({
    data,
    label,
    totalAmount,
    colors,
    showTextAnchor,
}) => {

  // Custom label function to render center text inside the Pie
  const renderCenterText = () => (
    <>
      <text
        x="50%"
        y="47%"
        dy={-25}
        textAnchor="middle"
        fill="white"
        fontSize="14px"
      >
        {label}
      </text>
      <text
        x="50%"
        y="47%"
        dy={8}
        textAnchor="middle"
        fill="white"
        fontSize="24px"
        fontWeight="semi-bold"
      >
        {totalAmount}
      </text>
    </>
  );

  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
          label={showTextAnchor ? renderCenterText : null} // Pass custom label here
          // Don't render default labels, only center text
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>

        <Tooltip content={CustomTooltip} />
        <Legend content={CustomLegend} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
