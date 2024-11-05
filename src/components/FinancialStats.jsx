import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase-config';

export function FinancialStats({ transactions, type }) {
  const [categories, setCategories] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryData = {};

      for (const transaction of transactions) {
        const categoryId = transaction.categoryId;
        if (!categoryData[categoryId]) {
          const categoryDoc = await getDoc(doc(db, 'categories', categoryId));
          categoryData[categoryId] = categoryDoc.data();
        }
      }
      setCategories(categoryData);
    };
    fetchCategories();
  }, [transactions]);

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

  // Format the data for Recharts (each object contains a category and total amount)
  const chartData = Object.keys(categoryTotals).map((categoryId) => ({
    category: categories[categoryId]?.label,
    amount: categoryTotals[categoryId],
    color: categories[categoryId]?.color || '#FFFFFF',
  }));

  // If there is no data, display a message
  if (chartData.length === 0) {
    return (
      <div className='mx-auto w-full md:w-[353px] h-60 mb-5 items-center'>
        <p className='text-center align-middle'> You have no {type} this month! </p>
      </div>
    );
  }

  return (
    <div className='relative mx-auto w-full md:w-[353px] h-60 mb-5 items-center'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={chartData} margin={{ top: 20 }}>
          <XAxis hide />
          <YAxis hide />
          <Bar dataKey='amount' label={{ position: 'top' }} radius={10}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}