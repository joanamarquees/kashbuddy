import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // to change from login to home page

import { Drawer, setDrawerState } from "../../components/Drawer.jsx";
import { NewTransactionForms } from "../../components/NewTransaction.jsx";
import { Calendar } from "../../components/Calendar.jsx";
import { TransactionSwitch } from "../../components/TransactionSwitch.jsx";
import { FinancialCard } from "../../components/Cards.jsx";
import { DisplayTransactions } from "../../components/DisplayTransactions.jsx";

import { IoAddCircle, IoCardOutline, IoSettingsOutline  } from "react-icons/io5";

export function Home() {
  const navigate = useNavigate();
  const [transactionType, setTransactionType] = useState('expense');

  const handleTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 h-full">
      {/* Header */}
      <div className="py-6 flex flex-row items-center justify-center gap-3 md:gap-52">
        <IoCardOutline
          size={40}
          className='text-indigo-400 cursor-pointer mx-2'
          onClick={() => navigate("/accounts")}
        />

        {/* Month search */}
        <Calendar />

        {/* Seatings */}
        <IoSettingsOutline
          size={35}
          className='text-indigo-400 cursor-pointer mx-2'
        />
      </div>

      <div className="w-[353px] md:w-[50%] mx-auto place-items-center">
        {/* Netwoth card */}
        <FinancialCard />

        {/* Transaction switch */}
        <TransactionSwitch type={transactionType} handleChange={handleTransactionTypeChange} />

        {/* Transactions */}
        <DisplayTransactions type={transactionType} />
      </div>

      {/* Footer */}
      <Drawer views={{"New-transaction": <NewTransactionForms />}}/>
      <IoAddCircle
        size={70}
        className='text-indigo-400 cursor-pointer fixed bottom-4 right-4'
        onClick={() => setDrawerState("New-transaction")}
      />
    </div>
  )
}