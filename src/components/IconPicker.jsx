import React, { useState } from 'react';

import { iconList } from '../utils/categories.js';

export function IconPicker({ categoryData, setCategoryData }) {
  const [selectedIcon, setSelectedIcon] = useState(5);

  const handleSelectIcon = (index) => {
    setSelectedIcon(index);
    setCategoryData({ ...categoryData, iconIndex: index });
  }

  return (
    <div className='grid grid-cols-6 md:grid-cols-12 lg:grid-cols-18'>
      {iconList.map((Icon, index) => (
        <div
          key={index}
          className={`flex flex-col items-center cursor-pointer p-2 rounded-full hover:bg-gray-200 transition ${
            selectedIcon === index ? 'bg-indigo-400/50' : ''
          }`}
          onClick={() => handleSelectIcon(index)}
        >
          <Icon
            size={24}
          />
        </div>
      ))}
    </div>

  );
};

