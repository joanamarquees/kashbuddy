import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

import { getCategoryColor } from '../utils/categories';

export function FinancialStats({transactions}) {
  // Calculate total amount for each category
  const categoryTotals = transactions.reduce((acc, transaction) => {
    if (transaction.transactionType === 'income') {
      return acc;
    }

    if (!acc[transaction.category]) {
      acc[transaction.category] = 0;
    }
    acc[transaction.category] += parseFloat(transaction.amount);
    return acc;
  }, {});

  // Format the data for Recharts (each object contains a category and total amount)
  const chartData = Object.keys(categoryTotals).map((category) => ({
    category,
    amount: categoryTotals[category],
  }));

  // If there is no data, display a message
  if (chartData.length === 0) {
    return (
      <div className="mx-auto w-full md:w-[353px] h-60 mb-5 items-center">
        <p className="text-center align-middle"> You have no expenses this month! </p>
      </div>
    );
  }
    
  return (
    <div className="relative mx-auto w-full md:w-[353px] h-60 mb-5 items-center">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{top:20}}>
          <XAxis hide/>
          <YAxis hide/>
          <Bar dataKey="amount" label={{ position: 'top'}} radius={10} >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getCategoryColor(entry.category)} />
            ))}
          </Bar>     
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}