import React from 'react';
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";

export const TransactionSwitch = ({ transactionData, setTransactionData }) => {

  const handleTransactionTypeChange = (e) => {
    setTransactionData({ ...transactionData, transactionType: e.target.value });
  };

  return (
    <div className="relative w-full h-14 bg-zinc-900 rounded-full flex items-center justify-between">
      {/* Radio buttons */}
      <div className="flex w-full justify-around z-10">
        <label className="flex items-center cursor-pointer">
          <input
            type='radio'
            name='transactionType'
            value='expense'
            checked={transactionData.transactionType === 'expense'}
            onChange={handleTransactionTypeChange}
            className='hidden'
          />
          <span className="text-center font-normal w-full flex gap-2">
            <MdOutlineLocalGroceryStore /> Expense
          </span>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type='radio'
            name='transactionType'
            value='income'
            checked={transactionData.transactionType === 'income'}
            onChange={handleTransactionTypeChange}
            className='hidden'
          />
          <span className="text-center font-normal w-full flex gap-2">
            <BsCashCoin /> Income
          </span>
        </label>
      </div>

      {/* Slider for active tab */}
      <div
        className={`absolute w-[49%] h-12 ml-1 bg-pink-500 rounded-full transition-all duration-300 ease-in-out z-0 ${
          transactionData.transactionType === 'income' ? 'translate-x-full' : ''
        }`}
      />
    </div>
  );
};
