import React, { useState } from 'react'

import { useAddCategory } from '../hooks/useAddCategory.js'

import { Input } from './ui/Input.jsx'
import { Button } from './ui/Button.jsx'
import { TransactionSwitch } from './TransactionSwitch.jsx'
import { setDrawerState } from './ui/Drawer.jsx'
import { ColorPicker } from './ColorPicker.jsx'
import { IconPicker } from './IconPicker.jsx'

import { iconList } from '../utils/categories.js'

export function NewCategoryForms({ allCategories }) {
  const { addCategory } = useAddCategory(); 
  const [categoryData, setCategoryData] = useState({
    value: '',
    label: '',
    icon: 5,
    color: '#ffffff',
    categoryType: 'expense',
  });
  
  const [error, setError] = useState('');

  const handleCategoryTypeChange = (e) => {
    setCategoryData({ ...categoryData, categoryType: e.target.value });
  };

  const handleCategoryName = (e) => {
    const newValue = e.target.value;
    setCategoryData({ ...categoryData, label: newValue, value: newValue });
  };

  const handleAddCategory = async () => {
    if (!categoryData.label || !categoryData.color
      || !categoryData.iconIndex || !categoryData.categoryType
    ) {
      setError('Please fill in all fields');
      return;
    }

    await addCategory({
      'value': categoryData.value,
      'label': categoryData.label,
      'iconIndex': categoryData.iconIndex,
      'color': categoryData.color,
      'categoryType': categoryData.categoryType,
    });

    setDrawerState(null);
  }

  if (categoryData.iconIndex === undefined) {
    setCategoryData({ ...categoryData, iconIndex: 5 });
  }

  const Icon = iconList[categoryData.iconIndex];

  return (
    <div className='mx-auto w-5/6 align-middle flex flex-col justify-center align-center gap-5'>
      {/* Header */}
      <h1 className='mb-1 text-center font-semibold font-sans text-xl'>Edit Category</h1>

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
        type='text'
        placeholder='Category Name'
        value={categoryData.label}
        className='text-center font-semibold w-2/3 mx-auto'
        onChange={handleCategoryName}
      />

      {/* Category Type Switch */}
      <TransactionSwitch type={categoryData.categoryType} handleChange={handleCategoryTypeChange} />

      {/* Scrollable Color Bars */}
      <p className='ml-2 font-medium'>Color</p>
      <ColorPicker categoryData={categoryData} setCategoryData={setCategoryData} allCategories={allCategories}/>

      {/* Icon Grid */}
      <p className='ml-2 font-medium'>Icon</p>
      <IconPicker categoryData={categoryData} setCategoryData={setCategoryData}/>

      {/* Footer */}
      <div className='flex gap-2 justify-center'>
        <Button variant='secondary'>
          Cancel
        </Button>
        <Button onClick={handleAddCategory}>
          Save
        </Button>
      </div>
      {error && <p className='text-red-500 text-center'>{error}</p>}
    </div>
  )
}
