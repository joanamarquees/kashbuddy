import React, { Fragment, useState }  from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IoCloseOutline } from 'react-icons/io5';

import { useUpdateAccount } from '../hooks/useUpdateAccount.js';
import { useDeleteAccount } from '../hooks/useDeleteAccount.js';
import { Button } from './Button.jsx'
import { Input } from './Input.jsx'

export function Popup({bankName, amount}) {
  let [isOpen, setIsOpen] = useState(false)
  const { updateAmount } = useUpdateAccount();
  const { deleteAccount } = useDeleteAccount();
  const [newAmount, setNewAmount] = useState(amount);

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function handleAmountInput(amount) {
    const newAmount = parseFloat(amount.replace(/\D/g, '').replace(/^0+/, '')) || 0;
    setNewAmount(newAmount);
  }

  async function handleUpdateAmount() {
    await updateAmount({
      bankName,
      "amount": newAmount,
    });
    closeModal();
  }

  async function handleDeleteAccount() {
    await deleteAccount({bankName});
    closeModal();
  }


  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="container mx-auto w-5/6 h-16 align-middle flex border-dashed border-[1.5px]  border-white rounded-xl">
          <p className="pl-3 mx-auto ml-0  content-center"> {bankName} </p>
          <p className="pr-3 mx-auto mr-0  content-center"> {amount}€ </p> 
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-900 p-6 text-left align-middle shadow-xl transition-all">
                  <button className="ml-1 mt-1">
                    <IoCloseOutline size={30} onClick={closeModal}/>
                  </button>
                  <div className="px-4 pb-4 sm:p-6 sm:pb-4 flex flex-col justify-center items-center align-center gap-6">
                    <div className="sm:flex sm:items-center">
                      <div className="modal-box">
    
                        <h3 className="font-bold text-lg text-center"> Bank netwoth </h3>
                        <Input
                          id='update amount'
                          autoFocus
                          inputMode='numeric'
                          placeholder={amount}
                          value={newAmount}
                          onChange={(e) => handleAmountInput(e.target.value)} 
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={handleDeleteAccount}>
                        Delete account
                      </Button>
                      <Button onClick={handleUpdateAmount}>
                        Save
                      </Button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

