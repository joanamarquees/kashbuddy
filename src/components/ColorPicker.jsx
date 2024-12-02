import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/Button';
import { IoAdd } from 'react-icons/io5';

export function ColorPicker({ categoryData, setCategoryData, allCategories }) {
  const inputRef = useRef(null);
  const [colors, setColors] = useState([]);
  const [color, setColor] = useState(categoryData.color); // Default color

  useEffect(() => {
    const uniqueColors = [...new Set(allCategories.map(category => category.color))];
    setColors(uniqueColors);
  }, [allCategories]);

  const handleColorChange = (e) => {
    setColor(e.target.value);
    setCategoryData({ ...categoryData, color: e.target.value });
  };

  const addColor = () => {
    if (!colors.includes(color)) {
      setColors([color, ...colors]);
    }
  };

  return (
    <div className='flex flex-row overflow-x-auto overflow-hidden max-w-[19rem] md:max-w-sm'>
      <div className='flex gap-3 ml-1'>
        {/* Color Picker Input */}
        <div className='flex-col text-center space-y-1 max-w-full'>
          <div className='w-8 h-8 relative flex align-middle mx-auto'>
            <input
              ref={inputRef}
              type='color'
              value={color}
              onChange={handleColorChange}
              className='appearance-none w-full h-full p-0 cursor-pointer opacity-0 absolute z-50'
            />
            <IoAdd
              onClick={() => inputRef.current.click()}
              size={33}
              className='absolute cursor-pointer text-zinc-950'
            />
            <div
              style={{ backgroundColor: color }}
              className='w-full h-full rounded-full cursor-pointer'
              onClick={() => inputRef.current.click()}
            />
          </div>
        </div>

        {/* Display the selected colors as balls */}
        {colors.map((color, index) => (
          <div
            key={index}
            className='w-8 h-8 rounded-full cursor-pointer'
            onClick={() => setCategoryData({ ...categoryData, color: color })}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  )
}