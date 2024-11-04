import React from 'react';

import { getCategoriesByType } from '../utils/categories.js';

import { useGetCategories } from '../hooks/useGetCategories.js';

export function Dropdown({ transactionData, setTransactionData }){
  const { categories } = useGetCategories();

  const handleCategoryChange = (e) => {
    setTransactionData({ ...transactionData, categoryId: e.target.value });
  };

  return transactionData.transactionType === 'income' ? (
    <select
      name='incomeCategory'
      className='px-4 h-12 w-1/2 bg-zinc-900 border border-zinc-950 rounded-2xl text-zinc-400 outline-none text-sm hover:border-zinc-800'
      onChange={handleCategoryChange}
      required
    >
      <option value='' disabled selected>category</option>
      {getCategoriesByType(categories, 'income').map(({ id, label }) => (
        <option key={id} value={id}>{label}</option>
      ))}
    </select>
  ) : (
    <select
      name='expensesCategory'
      className='px-4 h-12 w-1/2 bg-zinc-900 border border-zinc-950 rounded-2xl text-zinc-400 outline-none text-sm hover:border-zinc-800'
      onChange={handleCategoryChange}
      required
    >
      <option value='' disabled selected>category</option>
      {getCategoriesByType(categories, 'expenses').map(({ id, label }) => (
        <option key={id} value={id}>{label}</option>
      ))}
    </select>
  )
}