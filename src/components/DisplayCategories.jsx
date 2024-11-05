import React, { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';

import { Drawer, setDrawerState } from './ui/Drawer';
import { NewTransactionForms } from './NewTransaction';

import { IoAddCircle } from 'react-icons/io5';
import { db } from '../config/firebase-config';

export function DisplayCategories({ type, transactions }) {
  const [categories, setCategories] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryData = {};

      for (const transaction of transactions) {
        if (transaction.transactionType !== type) {
          continue;
        }

        const categoryId = transaction.categoryId;
        if (!categoryData[categoryId]) {
          const categoryDoc = await getDoc(doc(db, 'categories', categoryId));
          categoryData[categoryId] = categoryDoc.data();
        }
      }
      setCategories(categoryData);
    };
    fetchCategories();
  }, [transactions, type]);

  // Calculate total amount for each category
  const categoryTotals = transactions.reduce((acc, transaction) => {
    if (transaction.transactionType !== type) {
      return acc;
    }
    const categoryId = transaction.categoryId;
    if (!acc[categoryId]) {
      acc[categoryId] = 0;
    }
    acc[categoryId] += parseFloat(transaction.amount);
    return acc;
  }, {});

  const chartData = Object.keys(categoryTotals).map((categoryId) => ({
    category: categories[categoryId]?.value,
    amount: categoryTotals[categoryId],
    color: categories[categoryId]?.color || '#FFFFFF',
  }));

  if (chartData.length === 0) {
    return (
      <>
        <Drawer views={{ 'New-transaction': <NewTransactionForms type={type} /> }} />
        <div
          className='container mx-auto w-full h-24 my-3 flex items-center border-dashed border-[1.5px] border-white rounded-lg cursor-pointer'
          onClick={() => setDrawerState('New-transaction')}
        >
          <IoAddCircle
            size={70}
            className='text-center ml-3'
            style={{ color: type === 'expense' ? '#f73131' : '#82f576' }}
          />
          <p className='text-left text-sm ml-3'>
            You don’t have any {type} this month. Tap to add one.
          </p>
        </div>
      </>
    );
  }

  return (
    <div className='grid grid-cols-2 gap-2 mt-3'>
      {chartData.map(({ category, amount, color }) => (
        console.log('category', category),
        <div
          key={category}
          className='container col-span-1 rounded-xl h-24 flex flex-col align-middle pt-5'
          style={{ backgroundColor: color }}
        >
          <p className='text-zinc-950 font-medium text-xl mx-auto content-center'>
            {category}
          </p>
          <p className='text-zinc-950 font-bold text-sm mx-auto content-center'>
            {amount}€
          </p>
        </div>
      ))}
    </div>
  );
}
