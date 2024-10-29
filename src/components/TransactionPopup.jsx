import React, { Fragment, useState }  from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IoCloseOutline } from 'react-icons/io5';

import { useUpdateTransaction  } from '../hooks/useUpdateTransaction.js';
import { useDeleteTransaction } from '../hooks/useDeleteTransaction.js';
import { TransactionSwitch } from './TransactionSwitch.jsx'
import { Dropdown } from './TransactionCategory.jsx'
import { getCategoryIcon, getCategoryColor } from '../utils/categories.js'

import { Button } from './Button.jsx'
import { Input } from './Input.jsx'

export function TransactionPopup({transaction}) {
  const { id } = transaction;
  const [transactionData, setTransactionData] = useState(transaction);

  let [isOpen, setIsOpen] = useState(false) 
  const { deleteTransaction } = useDeleteTransaction();
  const { updateTransaction } = useUpdateTransaction();

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  async function handleDeleteTransaction() {
    await deleteTransaction({id});
    closeModal();
  }

  async function handleUpdateTransaction() {
    await updateTransaction({
      ...transactionData,
    });
    closeModal();
  }

  // Get the icon and color for the category
  const IconComponent = getCategoryIcon(transactionData.category);
  const iconColor = getCategoryColor(transactionData.category);

  return (
    <>
      {/* Style this accordingly to transactions */}
      <button
        type="button"
        onClick={openModal}
        className="container mx-auto h-20 my-3 flex items-center shadow-[0px_-2px_4px_rgba(0,0,0,0.5),0px_2px_4px_rgba(0,0,0,0.5)] rounded-xl cursor-pointer"
      > 
        {/* Render the icon with its color */}
        {IconComponent && (
          <IconComponent
            size={35}
            style={{ color: iconColor, marginRight: '10px', marginLeft: '10px' }}
          />
        )}
        <p className="text-left text-base ml-3">
          {transactionData.description}
        </p>
        <p className="pr-3 mx-auto mr-0 content-center"> {transactionData.amount}€</p> 
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
                  <div className="px-4 pb-4 sm:p-6 sm:pb-4 flex flex-col justify-center items-center align-center">
                    <div className="sm:flex sm:items-center">
                      <div className="modal-box space-y-4 mb-6">
    
                        <h3 className="font-bold text-xl text-center mb-3"> {transactionData.description} </h3>

                        <TransactionSwitch
                          type={transactionData.transactionType}
                          placeholder={transactionData.transactionType}
                          value={transactionData.transactionType}
                        />

                        <Input
                          id='description'
                          placeholder={transactionData.description}
                          value={transactionData.description}
                          className="w-full"
                          onChange={(e) => setTransactionData({ ...transactionData, description: e.target.value })}
                        />

                        <div className="flex justify-between gap-4 w-full">
                          <Input
                            id='update amount'
                            inputMode='numeric'
                            placeholder={transactionData.amount}
                            className='w-1/2'
                            value={transactionData.amount}
                            onChange={(e) => setTransactionData({ ...transactionData, amount: e.target.value.replace(/\D/g, '').replace(/^0+/, '') })}
                          />
                          <Dropdown transactionData={transactionData} setTransactionData={setTransactionData}/>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={handleDeleteTransaction}>
                        Delete transaction
                      </Button>
                      <Button onClick={handleUpdateTransaction}>
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

