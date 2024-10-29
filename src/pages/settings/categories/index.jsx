import React from 'react';

import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoAdd } from 'react-icons/io5';

import { expensesCategories, incomeCategories, getCategoryIcon, getCategoryColor } from '../../../utils/categories.js';

export function Categories() {
  const navigate = useNavigate();
  const categories = expensesCategories.concat(incomeCategories).sort((a, b) => {
    if (a.label < b.label) return -1;
    if (a.label > b.label) return 1;
    return 0;
  });

  return (
    <div className="container mx-auto px-4 h-full">
      {/* Header */}
      <div className="py-6 flex flex-row items-center justify-between gap-6">
        <IoMdArrowRoundBack
          size={30}
          className="cursor-pointer mx-2"
          onClick={() => navigate('/settings')}
        />

        <h1 className="text-2xl md:text-4xl font-bold font-sans mx-2 flex-grow text-center">
          Categories
        </h1>

        {/* Empty div to maintain layout */}
        {categories.length >= 1 ?
          <button> 
            <IoAdd
              size={30}
              // onClick={() => setDrawerState("New-category")}
              className='cursor-pointer mx-2'
            />
          </button>
          : <IoAdd size={30} className="invisible" />
        }
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {categories.map(({ value, label }) => {
          const IconComponent = getCategoryIcon(value);
          const iconColor = getCategoryColor(value);

          return (
            <div
              key={value}
              className="container mx-auto h-14 flex items-center shadow-[0px_-2px_4px_rgba(0,0,0,0.4),0px_2px_4px_rgba(0,0,0,0.4)] rounded-full cursor-pointer"
            >
              {/* Render the icon with its color */}
              {IconComponent && (
                <IconComponent
                  size={35}
                  style={{ color: iconColor, marginRight: '10px', marginLeft: '10px' }}
                />
              )}
              <p className="text-left text-base ml-3"> {label} </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
