import React from "react";
import { useNavigate } from 'react-router-dom';

import { IoMdArrowRoundBack } from "react-icons/io";
import { IoGrid, IoNotificationsOutline, IoLogOutOutline } from "react-icons/io5";
import { PiBank } from "react-icons/pi";
import { TbFaceId } from "react-icons/tb";

export function Settings() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 h-full">
      {/* Header */}
      <div className="py-6 flex flex-row items-center justify-between gap-6">
        <IoMdArrowRoundBack
          size={30}
          className="cursor-pointer mx-2"
          onClick={() => navigate('/home')}
        />

        <h1 className="text-2xl md:text-4xl font-bold font-sans mx-2 flex-grow text-center">
          Settings
        </h1>

        {/* Empty div to maintain layout */}
        <div className="w-8"></div>
      </div>

      {/* Settings */}

      {/* Bank accounts */}
      <div className="container mx-auto h-14 my-3 flex items-center shadow-[0px_-2px_4px_rgba(0,0,0,0.5),0px_2px_4px_rgba(0,0,0,0.5)] rounded-full cursor-pointer">
        <PiBank
          size={25}
          style={{ color: '#90a955', marginRight: '10px', marginLeft: '20px' }}
        />
        <p className="text-left text-base ml-3"> Accounts </p>
      </div>

      {/* Categories */}
      <div className="container mx-auto h-14 my-3 flex items-center shadow-[0px_-2px_4px_rgba(0,0,0,0.4),0px_2px_4px_rgba(0,0,0,0.4)] rounded-full cursor-pointer">
        <IoGrid
          size={25}
          style={{ color: 'purple', marginRight: '10px', marginLeft: '20px' }}
        />
        <p className="text-left text-base ml-3"> Categories </p>
      </div>

      {/* Notifications */}
      <div className="container mx-auto h-14 my-3 flex items-center shadow-[0px_-2px_4px_rgba(0,0,0,0.5),0px_2px_4px_rgba(0,0,0,0.5)] rounded-full">
        <IoNotificationsOutline
          size={25}
          style={{ color: 'pink', marginRight: '10px', marginLeft: '20px' }}
        />
        <p className="text-left text-base ml-3"> Notifications </p>
        <label className="pr-3 mx-auto mr-0 content-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer"/>
          <div
            className="relative w-11 h-6 bg-zinc-200 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-400"
          ></div>
        </label>
      </div>

      {/* Face ID/Touch ID */}
      <div className="container mx-auto h-14 my-3 flex items-center shadow-[0px_-2px_4px_rgba(0,0,0,0.5),0px_2px_4px_rgba(0,0,0,0.5)] rounded-full">
        <TbFaceId
          size={25}
          style={{ marginRight: '10px', marginLeft: '20px' }}
        />
        <p className="text-left text-base ml-3"> FaceID / TouchID </p>
        <label className="pr-3 mx-auto mr-0 content-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer"/>
          <div
            className="relative w-11 h-6 bg-zinc-200 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-400"
          ></div>
        </label>
      </div>

      {/* Logout */}
      <div className="container mx-auto h-14 my-3 flex items-center shadow-[0px_-2px_4px_rgba(0,0,0,0.5),0px_2px_4px_rgba(0,0,0,0.5)] rounded-full cursor-pointer">
        <IoLogOutOutline
          size={25}
          style={{ marginRight: '10px', marginLeft: '20px' }}
          className="translate rotate-180"
        />
        <p className="text-left text-base ml-3"> Logout </p>
      </div>

    </div>
  );
};
