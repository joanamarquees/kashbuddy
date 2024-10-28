import React from 'react';

import { useGetTransactions } from '../hooks/useGetTransactions';
import { Drawer, setDrawerState } from './Drawer';
import { NewTransactionForms } from './NewTransaction';
import { getCategoryColor } from '../utils/categories';

import { IoAddCircle } from 'react-icons/io5';

export function DisplayCategories({type}) {
  const { transactions } = useGetTransactions();

  // Calculate total amount for each category
  const categoryTotals = transactions.reduce((acc, transaction) => {
    if (transaction.transactionType !== type) {
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

  if (chartData.length === 0) {
    return (
      <>
        <Drawer views={{"New-transaction": <NewTransactionForms type={type}/>}}/>
        <div
          className="container mx-auto w-full h-24 my-3 flex items-center border-dashed border-[1.5px] border-white rounded-lg cursor-pointer"
          onClick={() => setDrawerState("New-transaction")}
        >
          <IoAddCircle
            size={70}
            className="text-center ml-3"
            style={{color : type === "expense" ? "#f73131" : "#82f576" }}
          />
          <p className="text-left text-sm ml-3">
            You don’t have any {type} this month. Tap to add one.
          </p>
        </div>
      </>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-2 mt-3">
      {chartData.map(({category, amount}) => {
        const bgColor = getCategoryColor(category);

        return (
          <div
            key={category}
            className="container col-span-1 rounded-xl h-24 flex flex-col align-middle pt-5"
            style={{ backgroundColor: bgColor }}
          >
            <p className="text-zinc-950 font-medium text-xl mx-auto content-center">
              {category}
            </p>
            <p className="text-zinc-950 font-bold text-sm mx-auto content-center">
              {amount}€
            </p>
          </div>
        )
      })}
    </div>
  )
}
