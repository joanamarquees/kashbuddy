import React from 'react'
import { useState } from 'react'

import { useAddTransaction } from '../hooks/useAddTransaction.js'

import { Input } from './input.tsx'
import { Button } from './button.tsx'
import { setDrawerState } from './drawer.tsx'
import { Dropdown } from './transaction-type.tsx'
import { TransactionSwitch } from './transaction-switch.tsx'

export function NewTransactionForms() {
  const { addTransaction } = useAddTransaction();
  const [transactionData, setTransactionData] = useState({
    description: '',
    amount: '',
    category: '',
    transactionType: 'expense',
  });

  const [error, setError] = useState('');

  const handleAddTransaction = async () => {
    if (!transactionData.description || !transactionData.amount
      || !transactionData.category || !transactionData.transactionType
    ) {
      setError('Please fill in all fields');
      return;
    }

    await addTransaction({
      "description": transactionData.description,
      "amount": transactionData.amount,
      "category": transactionData.category,
      "transactionType": transactionData.transactionType,
    });

    setDrawerState(null);
  }

  return (
    <div className="mx-auto w-5/6 align-middle flex flex-col justify-center align-center gap-5">
      <h1 className="mb-4 text-center font-semibold font-sans text-xl">Add a new transaction</h1>

      {/* Transaction type switch */}
      <TransactionSwitch transactionData={transactionData} setTransactionData={setTransactionData} />

      {/* Transaction description */}
      <Input
        id='description'
        autoFocus
        placeholder='transaction description'
        value={transactionData.description}
        onChange={(e) => setTransactionData({ ...transactionData, description: e.target.value })}
      />

      {/* Transaction amount && category*/}
      <div className="flex justify-between gap-4 w-full">
        <Input
          id='amount'
          inputMode='numeric'
          placeholder='0.00€'
          className='w-1/2'
          value={transactionData.amount}
          onChange={(e) => setTransactionData({ ...transactionData, amount: e.target.value.replace(/\D/g, '').replace(/^0+/, '') })}
        />
        <Dropdown transactionData={transactionData} setTransactionData={setTransactionData}/>
      </div>

      <div className="flex gap-2 justify-center my-4">
        <Button variant="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddTransaction}>
          Save
        </Button>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  )
}