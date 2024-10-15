import React from 'react';

import { Drawer, setDrawerState } from './Drawer';
import { NewTransactionForms } from './NewTransaction';

import { useGetTransactions } from '../hooks/useGetTransactions';
import { IoAddCircle } from 'react-icons/io5';

export function DisplayTransactions({type}){
  const { transactions } = useGetTransactions();
  

  const total = transactions.reduce((counter, transaction) => {
    if (transaction.transactionType === type){
      return counter + parseFloat(transaction.amount);
    }
    return counter;
  }, 0);

  if (total === 0) {
    return (
      <>
        <Drawer views={{"New-transaction": <NewTransactionForms type={type}/>}}/>
        <div
          className="container mx-auto w-full h-24 my-3 flex items-center border-dashed border-[1.5px] border-white rounded-lg cursor-pointer"
          onClick={() => setDrawerState("New-transaction")}
        >
          <IoAddCircle
            size={70}
            className="text-center ml-3"
            style={{color : type === "expense" ? "#f73131" : "#82f576" }}
          />
          <p className="text-left text-sm ml-3">
            You don’t have any {type} this month. Tap to add one.
          </p>
        </div>
      </>
    )
  }

  return (
    <>
      <ul> 
        {transactions.map((transaction) => {
          const { description, amount, transactionType } = transaction;

          if (transactionType === type){
            return (
              <li className="container mx-auto w-full h-16 my-3 flex align-middle border-dashed border-[1.5px] border-white rounded-lg">
                <p className="pl-3 mx-auto ml-0 content-center"> {description} </p>
                <p className="pr-3 mx-auto mr-0 content-center"> {amount}€</p> 
              </li>
            )
          }
        })}
      </ul>
    </>
  )
}