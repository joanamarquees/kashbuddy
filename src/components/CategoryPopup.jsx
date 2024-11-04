import React, { Fragment, useState }  from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IoCloseOutline } from 'react-icons/io5';

import { useDeleteCategory } from '../hooks/useDeleteCategory.js';
import { useUpdateCategory } from '../hooks/useUpdateCategory.js';
import { iconList } from '../utils/categories.js';
import { Button } from './ui/Button.jsx'
import { Input } from './ui/Input.jsx'
import { TransactionSwitch } from './TransactionSwitch.jsx'
import { ColorPicker } from './ColorPicker.jsx'
import { IconPicker } from './IconPicker.jsx'

export function Popup({ category, allCategories }) {
  const { id } = category;
  const { updateCategory } = useUpdateCategory();
  let [isOpen, setIsOpen] = useState(false)
  const [categoryData, setCategoryData] = useState(category);
  const { deleteCategory } = useDeleteCategory();

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  async function handleDeleteCategory() {    
    await deleteCategory({ id });
    closeModal();
  }

  async function handleUpdateCategory() {
    await updateCategory({
      ...categoryData,
    });
    closeModal();
  }
  
  const Icon = iconList[categoryData?.iconIndex];

  return (
    <>
      <button
        type='button'
        onClick={openModal}
        className='container mx-auto h-14 flex items-center shadow-[0px_-2px_4px_rgba(0,0,0,0.4),0px_2px_4px_rgba(0,0,0,0.4)] rounded-full cursor-pointer'
      >
        {/* Render the icon with its color */}
        {Icon && (
          <Icon
            size={35}
            style={{ color: category.color, marginRight: '10px', marginLeft: '10px' }}
          />
        )}
        <p className='text-left text-base ml-3'> {category.value} </p>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/50' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-800 p-6 text-left align-middle shadow-xl transition-all'>
                  <button className='ml-1 mt-1'>
                    <IoCloseOutline size={30} onClick={closeModal}/>
                  </button>
                  <div className='px-4 pb-4 sm:p-6 sm:pb-4 flex flex-col justify-center items-center align-center gap-6'>
                    <div className='sm:flex sm:items-center'>
                      <div className='modal-box space-y-5'>
    
                        <h3 className='font-bold text-lg text-center'> Edit Category </h3>

                        {/* Display choosen Icon with respective Color */}
                        <div className='flex flex-row items-center justify-center'>
                          {Icon && (
                            <Icon
                              size={45}
                              style={{ color: categoryData.color}}
                            />
                          )}
                        </div>

                        {/* Category Name Input */}
                        <Input
                          id='value'
                          placeholder={categoryData.value}
                          value={categoryData.value}
                          className='w-full'
                          onChange={(e) => setCategoryData({ ...categoryData, value: e.target.value, label: e.target.value })}
                        />

                        {/* Scrollable Color Bars */}
                        <p className='ml-2 font-medium'>Color</p>
                        <ColorPicker categoryData={categoryData} setCategoryData={setCategoryData} allCategories={allCategories}/>

                        {/* Icon Grid */}
                        <p className='ml-2 font-medium'>Icon</p>
                        <IconPicker categoryData={categoryData} setCategoryData={setCategoryData}/>
                      </div>
                    </div>
                    <div className='flex gap-2'>
                      <Button variant='secondary' onClick={handleDeleteCategory}>
                        Delete category
                      </Button>
                      <Button onClick={handleUpdateCategory}>
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

