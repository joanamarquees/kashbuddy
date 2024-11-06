import React from 'react';
import { useGetCategories } from '../hooks/useGetCategories';
import { useGetAccounts } from '../hooks/useGetAccounts';
import { getCategoriesByType } from '../utils/categories';

export function Dropdown({ transactionData, setTransactionData, field, placeholder }) {
  const { categories } = useGetCategories();
  const { accounts } = useGetAccounts();

  const handleChange = (e) => {
    setTransactionData({ ...transactionData, [field]: e.target.value });
  };

  if (field === 'categoryId') {
    return transactionData.transactionType === 'income' ? (
      <select
        name='incomeCategory'
        className='px-4 h-12 w-1/2 bg-zinc-900 border border-zinc-950 rounded-2xl text-zinc-400 outline-none text-sm hover:border-zinc-800'
        onChange={handleChange}
        defaultValue="default"
        required
      >
        <option value="default" disabled>{placeholder}</option>
        {getCategoriesByType(categories, 'income').map(({ id, label }) => (
          <option key={id} value={id}>{label}</option>
        ))}
      </select>
    ) : (
      <select
        name='expensesCategory'
        className='px-4 h-12 w-1/2 bg-zinc-900 border border-zinc-950 rounded-2xl text-zinc-400 outline-none text-sm hover:border-zinc-800'
        onChange={handleChange}
        defaultValue="default"
        required
      >
        <option value="default" disabled>{placeholder}</option>
        {getCategoriesByType(categories, 'expense').map(({ id, label }) => (
          <option key={id} value={id}>{label}</option>
        ))}
      </select>
    );
  } else if (field === 'accountId') {
    return (
      <select
        name='account'
        className='px-4 h-12 w-1/2 bg-zinc-900 border border-zinc-950 rounded-2xl text-zinc-400 outline-none text-sm hover:border-zinc-800'
        onChange={handleChange}
        defaultValue="default"
        required
      >
        <option value="default" disabled>{placeholder}</option>
        {accounts.map(({ id, bankName }) => (
          <option key={id} value={id}>{bankName}</option>
        ))}
      </select>
    );
  }

  return null;
}