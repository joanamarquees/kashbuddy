import React from 'react';

import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { IoAdd } from 'react-icons/io5';

import { Button } from '../../../components/ui/Button.jsx';
import { Drawer, setDrawerState } from '../../../components/ui/Drawer.jsx';
import { NewCategoryForms } from '../../../components/NewCategory.jsx';
import { iconList } from '../../../utils/categories.js';
import { Popup } from '../../../components/CategoryPopup.jsx';

import { useGetCategories } from '../../../hooks/useGetCategories.js';

export function Categories() {
  const navigate = useNavigate();
  const { categories } = useGetCategories();

  return (
    <div className='container mx-auto px-4 h-full'>
      <Drawer views={{'New-category': <NewCategoryForms allCategories={categories}/>}}/>
      {/* Header */}
      <div className='py-6 flex flex-row items-center justify-between gap-6'>
        <IoMdArrowRoundBack
          size={30}
          className='cursor-pointer mx-2'
          onClick={() => navigate('/settings')}
        />

        <h1 className='text-2xl md:text-4xl font-bold font-sans mx-2 flex-grow text-center'>
          Categories
        </h1>

        {categories.length >= 1 ?
          <button> 
            <IoAdd
              size={30}
              onClick={() => setDrawerState('New-category')}
              className='cursor-pointer mx-2'
            />
          </button>
          : <IoAdd size={30} className='invisible' />
        }
      </div>

      {categories.length <= 0 ? (
        <div className='py-6 flex flex-col items-center justify-center gap-8 md:text-lg'>
          <p className='text-zinc-300 leading-relaxed max-w-80 md:max-w-lg text-center font-sans'>
            You haven't registered any category, how about registering one right now?
          </p>
          <Button onClick={() => setDrawerState('New-category')} className='cursor-pointer'>
            Add a category
          </Button>
        </div>
      ) : (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
      
      {categories.map((category) => {
          return (
            <Popup
              key={category.id}
              category={category}
              allCategories={categories}
            />
          );
        })}

      </div>
      )}     
    </div>
  );
}
