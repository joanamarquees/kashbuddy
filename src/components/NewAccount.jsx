import React, { useState }  from 'react'
import { Input } from './ui/Input.jsx'
import { Button } from './ui/Button.jsx'
import { setDrawerState } from './ui/Drawer.jsx'
import { useAddAccount } from '../hooks/useAddAccounts.js'

export function NewAccountForms() {
  const { addAccount } = useAddAccount();
  const [accountData, setAccountData] = useState({
    bankName: '',
    amount: '',
  });
  const [error, setError] = useState('');

  const handleAddAccount = async () => {
    if (!accountData.bankName || !accountData.amount) {
      setError('Please fill in all fields');
      return;
    }

    await addAccount({
      'bankName': accountData.bankName,
      'amount': accountData.amount,
    });

    setDrawerState(null);
  }

  return (
    <div className='mx-auto w-5/6 align-middle flex flex-col justify-center align-center gap-4'>
      <h1 className='mb-4 text-center font-semibold font-sans text-xl'>Add a new account</h1>

      <p className='ml-2 font-medium'> Bank name </p>
      <Input
        id='bankName'
        placeholder='Insert your bank name...'
        value={accountData.bankName}
        onChange={(e) => setAccountData({ ...accountData, bankName: e.target.value })}
      />

      <p className='ml-2 font-medium'> Bank networth </p>
      <Input
        id='amount'
        inputMode='numeric'
        placeholder='Insert your bank networth...'
        value={accountData.amount}
        onChange={(e) => setAccountData({ ...accountData, amount: e.target.value.replace(/\D/g, '').replace(/^0+/, '') })}
      />

      <div className='my-4 flex justify-center'>
        <Button onClick={handleAddAccount}>
          Save
        </Button>
      </div>
      {error && <p className='text-red-500 text-center'>{error}</p>}
    </div>
  )
}