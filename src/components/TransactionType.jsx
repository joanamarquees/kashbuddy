import React from 'react';

export function Dropdown({ transactionData, setTransactionData }){

  const handleCategoryChange = (e) => {
    setTransactionData({ ...transactionData, category: e.target.value });
  };

  const expensesCategories = [
  {
    value: 'food',
    label: 'diner/lunch',
  },
  {
    value: 'grocery',
    label: 'grocery shop',
  },
  {
    value: 'car',
    label: 'car',
  },
  {
    value: 'parking',
    label: 'parking',
  },
  {
    value: 'uber',
    label: 'uber',
  },
  {
    value: 'clothes',
    label: 'clothes',
  },
  {
    value: 'fun',
    label: 'fun',
  },
  {
    value: 'house',
    label: 'house',
  },
  {
    value: 'bunnies',
    label: 'bunnies',
  },
  {
    value: 'beauty',
    label: 'beauty/farmacy',
  },
  {
    value: 'health',
    label: 'health',
  },
  {
    value: 'other',
    label: 'other',
  
  }]

  const incomeCategories = [
  {
    value: 'rent',
    label: 'rent',
  },
  {
    value: 'sales',
    label: 'sales percentage',
  },
  {
    value: 'gift',
    label: 'gift',
  },
  {
    value: 'other',
    label: 'other',
  }]


  return transactionData.transactionType === 'expense' ? (
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
  ) : (
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
  )
}