import { IoMdArrowRoundBack } from 'react-icons/io';
import { MdAddCard } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/ui/Button.jsx';
import { setDrawerState, Drawer } from '../../components/ui/Drawer.jsx';
import { Popup } from '../../components/AccountPopup.jsx';
import { NewAccountForms } from '../../components/NewAccount.jsx';

import { useGetAccounts } from '../../hooks/useGetAccounts.js';
import { calculateNetworth } from '../../utils/networth.js'

export function Accounts() {
  const navigate = useNavigate();

  const { accounts } = useGetAccounts();
  const { totalNetworth } = calculateNetworth(accounts);

  return (
    <div className='container mx-auto px-4 h-full'>
      <Drawer views={{'New-account': <NewAccountForms/>}}/>
      {/* Header */}
      <div className='py-6 flex flex-row items-center justify-center gap-6'>
        {accounts.length >= 1 ?
          <button> 
            <MdAddCard
              size={30}
              onClick={() => setDrawerState('New-account')}
              className='cursor-pointer mx-2'
            />
          </button>
          : <MdAddCard size={30} className='invisible' />
        }

        <h1 className='text-2xl md:text-4xl font-bold font-sans mx-2'> BankAccounts </h1>

        <IoMdArrowRoundBack
          size={30}
          className='cursor-pointer mx-2 translate rotate-180'
          onClick={() => navigate('/home')}
        />
      </div>

      {accounts.length <= 0 ? (
        <div className='py-6 flex flex-col items-center justify-center gap-8 md:text-lg'>
          <p className='text-zinc-300 leading-relaxed max-w-80 md:max-w-lg text-center font-sans'>
            You haven't registered any bank account, how about registering one right now?
          </p>
          <Button onClick={() => setDrawerState('New-account')}> 
            Add an account
          </Button>
        </div>
      )
      :
      (
        // Accounts page list
        <div>
          <h2 className='text-zinc-400 text-center text-2xl md:text-4xl font-sans'> NETWORTH </h2>
          <h3 className='text-indigo-400 text-center font-extrabold text-5xl md:text-7xl py-10 font-sans'> {totalNetworth}€ </h3>
          <div className='flex flex-col gap-3'>
            {accounts.map(({bankName, amount}) => (
              <Popup key={bankName} bankName={bankName} amount={amount}/> 
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
