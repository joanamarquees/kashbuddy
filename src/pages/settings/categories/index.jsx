import React from 'react';

import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { IoAdd } from 'react-icons/io5';

import { Button } from '../../../components/ui/Button.jsx';
import { Drawer, setDrawerState } from '../../../components/ui/Drawer.jsx';
import { NewCategoryForms } from '../../../components/NewCategory.jsx';
import { getCategoryColor, iconList } from '../../../utils/categories.js';

import { useGetCategories } from '../../../hooks/useGetCategories.js';

export function Categories() {
  const navigate = useNavigate();
  const { categories } = useGetCategories();

  return (
    <div className='container mx-auto px-4 h-full'>
      <Drawer views={{'New-category': <NewCategoryForms />}}/>
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
          const Icon = iconList[category.iconIndex];

          return (
            <div
              key={category.value}
              className='container mx-auto h-14 flex items-center shadow-[0px_-2px_4px_rgba(0,0,0,0.4),0px_2px_4px_rgba(0,0,0,0.4)] rounded-full cursor-pointer'
            >
              {/* Render the icon with its color */}
              {Icon && (
                <Icon
                  size={35}
                  style={{ color: category.color, marginRight: '10px', marginLeft: '10px' }}
                />
              )}
              <p className='text-left text-base ml-3'> {category.label} </p>
            </div>
          );
        })}
      </div>
      )}

    </div>
  );
}
