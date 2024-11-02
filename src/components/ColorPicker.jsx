import React, { useState, useRef } from 'react';

import { Button } from './ui/Button';

import { IoAdd } from 'react-icons/io5';

export function ColorPicker({ categoryData, setCategoryData }) {
  const inputRef = useRef(null);
  const [colors, setColors] = useState([]);
  const [color, setColor] = useState(categoryData.color); // Default color

  const handleColorChange = (e) => {
    setColor(e.target.value);
    setCategoryData({ ...categoryData, color: e.target.value });
  };

  // Function to handle adding a color to the list
  const addColor = () => {
    if (!colors.includes(color)) { // Avoid duplicates
      setColors([...colors, color]);
    }
  };

  return (
    <div className='flex flex-row'>

      {/* Color Picker Input */}
      <div className='flex-col text-center space-y-1'>
        <div className='w-8 h-8 relative flex align-middle mx-auto'>
          <input
            ref={inputRef}
            type='color'
            value={color}
            onChange={handleColorChange}
            className='appearance-none w-full h-full p-0 cursor-pointer opacity-0 absolute'
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

        {/* Button to add the selected color */}
        <Button
          onClick={addColor}
          variant='primary'
          size='sm'
        >
          Add
        </Button>
      </div>

      {/* Display the selected colors as balls */}
      <div className='flex gap-3 ml-1'>
        {colors.filter(color => color) // Filter out empty or invalid color values
          .reverse()
          .map((color, index) => (
            <div
              key={index}
              className='w-8 h-8 rounded-full'
              style={{ backgroundColor: color }}
            />
          ))}
      </div>
    </div>
  )
}