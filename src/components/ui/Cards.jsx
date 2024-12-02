import React from 'react';

import { IoMdArrowRoundBack } from 'react-icons/io';
import { calculateNetworth } from '../../utils/networth.js'

export const FinancialCard = ({transactions, accounts}) => {
  const { totalNetworth, totalExpenses, totalIncomes} = calculateNetworth(accounts, transactions);

  return (
    <div className='relative mx-auto w-full md:w-[353px] h-60 mb-5 items-center'>
      
      {/* Background Layer 1 */}
      <div className='absolute w-[90%] h-56 top-0 left-4 bg-slate-700 rounded-[22px]'></div>
      
      {/* Background Layer 2 */}
      <div className='absolute w-[95%] h-[208px] top-[21px] left-2 bg-slate-400 rounded-[22px]'></div>

      {/* Total Balance Section */}
      <div className='absolute top-14 left-0 right-0 flex flex-col items-center'>
        <h2 className='text-zinc-100 font-sans font-semibold text-lg'>Total Balance</h2>
        <p className='text-zinc-100 font-sans font-extrabold text-4xl'> {totalNetworth} €</p>
      </div>

      {/* Income and Expenses Section */}
      <div className='absolute w-full flex justify-between items-center top-40 px-10'>
        
        {/* Expenses Section */}
        <div className='flex items-center space-x-2'>
          {/* Circle Icon */}
          <div className='w-[34.54px] h-[32px] bg-white rounded-full flex justify-center items-center'>
            <IoMdArrowRoundBack
              size={20}
              className='text-zinc-900 translate -rotate-90'
            />
          </div>
          {/* Expenses Text */}
          <div>
            <p className='text-zinc-100 text-xs font-semibold'> Expenses </p>
            <p className='text-zinc-100 text-sm font-extrabold'> -{totalExpenses} €</p>
          </div>
        </div>

        {/* Income Section */}
        <div className='flex items-center space-x-2'>
          {/* Circle Icon */}
          <div className='w-[34.54px] h-[32px] bg-white rounded-full flex justify-center items-center'>
            <IoMdArrowRoundBack
              size={20}
              className='text-zinc-900 translate rotate-90'
            />
          </div>

          {/* Income Text */}
          <div>
            <p className='text-zinc-100 text-xs font-semibold'> Income </p>
            <p className='text-zinc-100 text-sm font-extrabold'> +{totalIncomes} €</p>
          </div>
        </div>
      </div>
    </div>
  );
};
