import React from 'react';

import { SlArrowLeft } from 'react-icons/sl';

export const Calendar = ({currentDate, setCurrentDate}) => {

  const previousMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const nextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };


  return (
    <div className="flex flex-row justify-between items-center p-4 mx-2 w-60 h-12 rounded-full border-2 border-solid border-indigo-400/20">
      {/* Left Arrow */}
      <SlArrowLeft
        size={15}
        className="text-zinc-100 cursor-pointer"
        onClick={previousMonth}
      />

      {/* Month Text */}
      <div className="text-center font-sans font-semibold">
        <p className="text-sm text-zinc-100">{currentDate.format('MMMM')}</p>
        <p className="text-xs text-zinc-400">{currentDate.format('YYYY')}</p>
      </div>

      {/* Right Arrow */}
      <SlArrowLeft
        size={15}
        className="text-zinc-100 transform rotate-180 cursor-pointer"
        onClick={nextMonth}
      />
    </div>
  );
};
