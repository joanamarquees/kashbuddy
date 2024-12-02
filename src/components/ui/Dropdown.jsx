import React, { useEffect, useState } from 'react';
import { useGetCategories } from '../../hooks/useGetCategories';
import { useGetAccounts } from '../../hooks/useGetAccounts';
import { getCategoriesByType } from '../../utils/categories';

export function Dropdown({ transactionData, setTransactionData, field, placeholder }) {
  const { categories } = useGetCategories();
  const { accounts }= useGetAccounts();

  // used to change colors of the dropdown
  const [selected, setSelected] = useState(false);

  const handleChange = (e) => {
    setTransactionData({ ...transactionData, [field]: e.target.value });
    setSelected(true);
  };

  return (
    <select
      className={`px-4 h-12 w-1/2 bg-zinc-900 border border-zinc-950 rounded-2xl ${selected ? 'text-zinc-50' : 'text-zinc-400'} outline-none text-sm hover:border-zinc-800`}
      onChange={handleChange}
      defaultValue="default"
      required
    >
      <option value="default" disabled className="text-zinc-400">
        {placeholder}
      </option>

      {field === 'categoryId' ? 
        // render categories
        getCategoriesByType(categories, transactionData.transactionType).map(({ id, label }) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))
        : 
        // render accounts
        accounts.map(({ id, bankName }) => (
          <option key={id} value={id} className="text-zinc-50">
            {bankName}
          </option>
        ))
      }
    </select>
  )
}