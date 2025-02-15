import React, { useState } from 'react';
import { useAddTransaction } from '../hooks/useAddTransaction.js';
import { Input } from './ui/Input.jsx';
import { Button } from './ui/Button.jsx';
import { setDrawerState } from './ui/Drawer.jsx';
import { Dropdown } from './ui/Dropdown.jsx';
import { TransactionSwitch } from './TransactionSwitch.jsx';

export function NewTransactionForms({ type }) {
  const { addTransaction } = useAddTransaction();
  const [transactionData, setTransactionData] = useState({
    description: '',
    amount: '',
    categoryId: '',
    transactionType: type,
    date: new Date(),
    accountId: '',
  });
  const [error, setError] = useState('');

  const handleTransactionTypeChange = (e) => {
    setTransactionData({ ...transactionData, transactionType: e.target.value });
  };

  const handleDateChange = (e) => {
    const dateString = e.target.value;
    const dateObject = new Date(dateString);
    setTransactionData({ ...transactionData, date: dateObject });
  };

  const handleAddTransaction = async () => {
    if (!transactionData.description || !transactionData.amount
      || !transactionData.categoryId || !transactionData.transactionType
      || !transactionData.date || !transactionData.accountId) {
      setError('Please fill in all fields');
      return;
    }
    
    await addTransaction({
      'description': transactionData.description,
      'amount': Number(parseFloat(transactionData.amount)),
      'categoryId': transactionData.categoryId,
      'transactionType': transactionData.transactionType,
      'date': new Date(transactionData.date),
      'accountId': transactionData.accountId,
    });
    setDrawerState(null);
  };

  return (
    <div className='mx-auto w-5/6 align-middle flex flex-col justify-center align-center gap-5'>
      <h1 className='mb-4 text-center font-semibold font-sans text-xl'>Add a new transaction</h1>
      <TransactionSwitch type={transactionData.transactionType} handleChange={handleTransactionTypeChange} />
      <Input
        id='description'
        placeholder='transaction description'
        value={transactionData.description}
        onChange={(e) => setTransactionData({ ...transactionData, description: e.target.value })}
      />

      {/* Transaction amount && category*/}
      <div className='flex justify-between gap-4 w-full'>
        <Input
          id='amount'
          inputMode='decimal'
          placeholder='0.00€'
          className='w-1/2'
          value={transactionData.amount}
          onChange={(e) => setTransactionData({ ...transactionData, amount: e.target.value.replace(',', '.')})}
        />
        <Input
          id='date'
          type='date'
          value={transactionData.date.toISOString().split('T')[0] || ''}
          className={`w-full z-50 ${!transactionData.date && 'text-zinc-400'}`}
          onChange={handleDateChange}
        />
      </div>

      <div className='flex justify-between gap-4 w-full'>
        <Dropdown
          transactionData={transactionData}
          setTransactionData={setTransactionData}
          field='categoryId'
          placeholder='category'
        />
        <Dropdown
          transactionData={transactionData}
          setTransactionData={setTransactionData}
          field='accountId'
          placeholder='account'
        />
      </div>
      <div className='flex gap-2 justify-center my-4'>
        <Button variant='secondary' onClick={() => setDrawerState(null)}>
          Cancel
        </Button>
        <Button onClick={handleAddTransaction}>
          Save
        </Button>
      </div>
      {error && <p className='text-red-500 text-center'>{error}</p>}
    </div>
  )
}
