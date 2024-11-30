import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IoCloseOutline } from 'react-icons/io5';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useUpdateTransaction } from '../hooks/useUpdateTransaction.js';
import { useDeleteTransaction } from '../hooks/useDeleteTransaction.js';
import { TransactionSwitch } from './TransactionSwitch.jsx';
import { Dropdown } from './ui/Dropdown.jsx';
import { iconList } from '../utils/categories.js';
import { Button } from './ui/Button.jsx';
import { Input } from './ui/Input.jsx';

import daysjs from 'dayjs';

export function TransactionPopup({ transaction }) {
  const { id } = transaction;
  const [transactionData, setTransactionData] = useState({
    ...transaction,
    date: transaction.date instanceof Date ? transaction.date : new Date(transaction.date.seconds * 1000)  // Handle Firestore Timestamp format
  });
  const [category, setCategory] = useState(null);
  const [account, setAccount] = useState(null);

  let [isOpen, setIsOpen] = useState(false);
  const { deleteTransaction } = useDeleteTransaction();
  const { updateTransaction } = useUpdateTransaction();

  useEffect(() => {
    const fetchCategory = async () => {
      const categoryDoc = await getDoc(doc(db, 'categories', transaction.categoryId));
      setCategory(categoryDoc.data());
    };
    fetchCategory();
  }, [transaction.categoryId]);

  useEffect(() => {
    const fetchAccount = async () => {
      const accountDoc = await getDoc(doc(db, 'accounts', transaction.accountId));
      setAccount(accountDoc.data());
    };
    fetchAccount();
  }, [transaction.accountId]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function handleDeleteTransaction() {
    await deleteTransaction({ id });
    closeModal();
  }

  const handleDateChange = (e) => {
    const dateString = e.target.value;
    const dateObject = new Date(dateString);
    setTransactionData({ ...transactionData, date: dateObject });
  }  

  async function handleUpdateTransaction() {
    await updateTransaction({
      id: transactionData.id,
      transactionType: transactionData.transactionType,
      description: transactionData.description,
      amount: Number(parseFloat(transactionData.amount)),
      categoryId: transactionData.categoryId,
      date: transactionData.date instanceof Date ? transactionData.date : new Date(transactionData.date),
      accountId: transactionData.accountId,
    });
    closeModal();
  }

  const Icon = iconList[category?.iconIndex];

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="container mx-auto h-20 my-3 flex items-center shadow-[0px_-2px_4px_rgba(0,0,0,0.5),0px_2px_4px_rgba(0,0,0,0.5)] rounded-xl cursor-pointer"
      >
        {Icon && (
          <Icon
            size={35}
            style={{ color: category.color, marginRight: '10px', marginLeft: '10px' }}
          />
        )}
        <p className="text-left text-base ml-3">
          {transaction.description}
        </p>
        <p className="pr-3 mx-auto mr-0 content-center"> {transaction.amount}€</p>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-800 p-6 text-left align-middle shadow-xl transition-all">
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
                            onChange={(e) => setTransactionData({ ...transactionData, amount: e.target.value.replace(/[^0-9.]/g, '').replace(/^0+(\d)/, '$1').replace(/(\..*)\./g, '$1') })}
                          />
                          <Input
                            id='date'
                            type='date'
                            value={daysjs(transactionData.date).format('YYYY-MM-DD')}
                            className={`w-full z-50 ${!transactionData.date && 'text-zinc-400'}`}
                            onChange={handleDateChange}
                          />
                        </div>

                        <div className='flex justify-between gap-4 w-full'>
                          <Dropdown
                            transactionData={transactionData}
                            setTransactionData={setTransactionData}
                            placeholder={category?.label}
                            field='categoryId'
                          />
                          <Dropdown
                            transactionData={transactionData}
                            setTransactionData={setTransactionData}
                            placeholder={account?.bankName}
                            field='accountId'
                          />
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