import React from 'react';
import { expensesCategories, incomeCategories } from '../utils/categories.js';

export function Dropdown({ transactionData, setTransactionData }){

  const handleCategoryChange = (e) => {
    setTransactionData({ ...transactionData, category: e.target.value });
  };

  return transactionData.transactionType === 'income' ? (
    <select
      name='incomeCategory'
      className="px-4 h-12 w-1/2 bg-zinc-900 border border-zinc-950 rounded-2xl text-zinc-400 outline-none text-sm hover:border-zinc-800"
      onClick={handleCategoryChange}
      required
    >
      <option value="" disabled selected>category</option>
      { incomeCategories.map(({ value, label }) => (
        <option key={value} value={value}>{label}</option>
      ))}
    </select>
  ) : (
    <select
      name='expensesCategory'
      className='px-4 h-12 w-1/2 bg-zinc-900 border border-zinc-950 rounded-2xl text-zinc-400 outline-none text-sm hover:border-zinc-800'
      onClick={handleCategoryChange}
      required
    >
      <option value="" disabled selected>category</option>
      { expensesCategories.map(({ value, label }) => (
        <option key={value} value={value}>{label}</option>
      ))}
    </select>
  )
}