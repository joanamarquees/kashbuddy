import React from 'react';
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";

export const TransactionSwitch = ({ type, handleChange }) => {

  return (
    <div className="relative w-full h-14 bg-zinc-900 rounded-full flex items-center justify-between">
      {/* Radio buttons */}
      <div className="flex w-full justify-around z-10">
        <label className="flex items-center cursor-pointer">
          <input
            type='radio'
            name='transactionType'
            value='expense'
            checked={type === 'expense'}
            onChange={handleChange}
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
            checked={type === 'income'}
            onChange={handleChange}
            className='hidden'
          />
          <span className="text-center font-normal w-full flex gap-2">
            <BsCashCoin /> Income
          </span>
        </label>
      </div>

      {/* Slider for active tab */}
      <div
        className={`absolute w-[49%] h-12 ml-1 bg-indigo-400 rounded-full transition-all duration-300 ease-in-out z-0 ${
          type === 'income' ? 'translate-x-full' : ''
        }`}
      />
    </div>
  );
};
