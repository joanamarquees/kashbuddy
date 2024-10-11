import { IoMdArrowRoundBack } from "react-icons/io";
import { MdAddCard } from "react-icons/md";
import { Button } from '../../components/button.tsx';
import { Popup } from '../../components/popup.tsx';
import { setDrawerState, Drawer } from '../../components/drawer.tsx';
import { NewAccountForms } from '../../components/new-account.tsx';

import { useGetAccounts } from '../../hooks/useGetAccounts.js';

export function Accounts() {
  
  const { accounts } = useGetAccounts();

  const totalNetWorth = accounts.reduce((acc, account) => acc + parseFloat(account.amount), 0);
  
  return (
    <div className="container mx-auto px-4 h-full">
      <Drawer views={{"New-account": <NewAccountForms/>}}/>
      {/* Header */}
      <div className="py-10 flex flex-row items-center justify-center gap-3 space-x-20">
        <IoMdArrowRoundBack size={30} />

        <h1 className="text-2xl md:text-4xl font-bold font-sans"> Accounts </h1>

        {accounts.length >= 1 ?
          <button> 
            <MdAddCard size={30} onClick={() => setDrawerState("New-account")}/> {/** () => navigate('/new-account') */}
          </button>
          : <MdAddCard size={30} className="invisible" />
        }
      </div>
      
      {/* Empty accounts page */}
      {accounts.length <= 0 ? (
        <div className="py-60 flex flex-col items-center justify-center gap-8 md:text-lg">
          <p className="text-zinc-300 leading-relaxed max-w-80 md:max-w-lg text-center font-sans">
            You haven't registered any bank account, how about registering one right now?
          </p>
          <Button onClick={() => setDrawerState("New-account")}> 
            Add an account
          </Button>
        </div>
      )
      :
      (
        // Accounts page list
        <div>
          <h2 className="text-zinc-400 text-center text-2xl md:text-4xl font-sans"> NET WORTH </h2>
          <h3 className="text-pink-500 text-center font-extrabold text-5xl md:text-7xl py-10 font-sans"> {totalNetWorth}€ </h3>
          <div className="flex flex-col gap-3">
            {accounts.map(({bankName, amount}) => (
              <Popup key={bankName} bankName={bankName} amount={amount}/> 
            ))}
          </div>
        </div>
      )}    
    </div>
  )
}
