import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // to change from login to home page
import ReactCardFlip from 'react-card-flip';

import { Drawer, setDrawerState } from "../../components/Drawer.jsx";
import { NewTransactionForms } from "../../components/NewTransaction.jsx";
import { Calendar } from "../../components/Calendar.jsx";
import { TransactionSwitch } from "../../components/TransactionSwitch.jsx";
import { FinancialCard } from "../../components/Cards.jsx";
import { DisplayTransactions } from "../../components/DisplayTransactions.jsx";
import { FinancialStats } from "../../components/FinancialStats.jsx";
import { DisplayCategories } from "../../components/DisplayCategories.jsx";
import { useGetTransactions } from "../../hooks/useGetTransactions.js";

import { IoAddCircle, IoCardOutline, IoSettingsOutline  } from "react-icons/io5";

import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

export function Home() {
  const navigate = useNavigate();
  const { transactions } = useGetTransactions();
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [flip, setFlip]  = useState(false);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [transactionType, setTransactionType] = useState('expense');

  const handleTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
  };

  const flipCard = () => {
    setFlip(!flip);
  };

  useEffect(() => {
    const filtered = transactions.filter((transaction) => {
      return dayjs(transaction.date).isSame(currentDate, 'month');
    });

    setFilteredTransactions(filtered);
  }, [currentDate, transactions]);

  return (
    <div className="container mx-auto px-4 h-full">
      {/* Header */}
      <div className="py-6 flex flex-row items-center justify-center gap-3 md:gap-52">
        <IoCardOutline
          size={40}transactions
          className='text-indigo-400 cursor-pointer mx-2'
          onClick={() => navigate("/accounts")}
        />

        {/* Month search */}
        <Calendar currentDate={currentDate} setCurrentDate={setCurrentDate}/>

        {/* Seatings */}
        <IoSettingsOutline
          size={35}
          className='text-indigo-400 cursor-pointer mx-2'
          onClick={() => navigate("/settings")}
        />
      </div>

      <div
        className="w-[353px] md:w-[50%] mx-auto place-items-center"
      >
        <ReactCardFlip flipDirection='horizontal' isFlipped={flip}>

          <div className="cursor-pointer" onClick={flipCard}>
            <FinancialCard transactions={filteredTransactions}/>
          </div>

          <div className="cursor-pointer" onClick={flipCard}>
            <FinancialStats transactions={filteredTransactions}/>
          </div>

        </ReactCardFlip>

        {/* Transaction switch */}
        <TransactionSwitch type={transactionType} handleChange={handleTransactionTypeChange} />         

        {/* If flip is true display categories, else display transactions */}
        { flip ?
          <DisplayCategories type={transactionType} transactions={filteredTransactions}/>
          :
          <DisplayTransactions type={transactionType} transactions={filteredTransactions}/>
        }
                   
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