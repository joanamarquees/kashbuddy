import { useState } from 'react';
import { useAddTransaction } from '../../hooks/useAddTransaction.js';
import { useGetTransactions } from "../../hooks/useGetTransactions.js";
import './expenses_style.css';

export const Expenses = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions } = useGetTransactions();
  const [transactionType, setTransactionType] = useState('expense');


  const onSubmit = (e) => {
    e.preventDefault()
    addTransaction({description: 'Compras de bananas', amount: 10, transactionType: 'expense', category: 'grocery'})
  };

  const categories = [{
    value: '',
    label: 'category',
  },
  {
    value: 'food',
    label: 'diner/lunch',
  },
  {
    value: 'grocery',
    label: 'grocery shop',
  },
  {
    value: 'car',
    label: 'car',
  },
  {
    value: 'parking',
    label: 'parking',
  },
  {
    value: 'uber',
    label: 'uber',
  },
  {
    value: 'clothes',
    label: 'clothes',
  },
  {
    value: 'fun',
    label: 'fun',
  },
  {
    value: 'house',
    label: 'house',
  },
  {
    value: 'bunnies',
    label: 'bunnies',
  },
  {
    value: 'beauty',
    label: 'beauty/farmacy',
  },
  {
    value: 'health',
    label: 'health',
  },
  {
    value: 'other',
    label: 'other',
  
  }]
  
  return (
    <>
      <div className='expense-tracker'>
        <div className='container'></div>
          <h1> EXPENSE TRACKER </h1>
          <div className='balance'>
            <h2> balance </h2>
            <h3> $0.00 </h3> {/* TODO: dynamic value */} 
          </div>
          <div className='summary'>
            <div className='income'>
              <h2> income </h2>
              <h3> $0.00 </h3> {/* TODO: dynamic value */} 
            </div>
            <div className='expense'>
              <h2> expenses </h2>
              <h3> $0.00 </h3> {/* TODO: dynamic value */} 
            </div>
          </div>
          <form className='add-transaction' onSubmit={onSubmit}> {/* TODO: transform this in drawer and add a date??*/}
            <input type='text' placeholder='description' required />
            <input type='number' placeholder='amount' required />

            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="expense"> Expense</label>
            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income"> Income</label>

            {transactionType === 'expense' && (
              <select type='text' name="category" required>
                { categories.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            )}
            <button type='submit' value='type'> save </button>
          </form>
      </div>
      <div className="transactions">
        <h2> transactions </h2>
        <ul> 
          {transactions.map((transaction) => {
            const { description, amount, transactionType } = transaction; //TODO: category???

            //TODO: style it correctly
            return (
              <li> 
                <h4> {description} </h4>
                <p> {amount}€
                  <label style={{color : transactionType === "expense" ? "red" : "green" }}> {transactionType}
                  </label>
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  );
};