import React, { useState } from 'react';

import { SlArrowLeft } from 'react-icons/sl';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

export const Calendar = () => {
  const [currentDate, setCurrentMonth] = useState(dayjs());

  const previousMonth = () => {
    setCurrentMonth(currentDate.subtract(1, 'month'));
  };

  const nextMonth = () => {
    setCurrentMonth(currentDate.add(1, 'month'));
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
      <div className="text-center font-sans font-semibold text-sm text-zinc-100">
        {currentDate.format('MMMM')}
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
