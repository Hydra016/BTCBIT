import React from 'react';
import Platform from '../components/Platform';
import { FiBell, FiLogOut, FiChevronDown } from "react-icons/fi";
import Image from 'next/image';


const Currencies = () => {
  return (
    <div className='overflow-y-auto h-screen bg-[#eff1f3]'>
      <div className='py-3 pr-3 flex justify-between items-center'>
        <Image src="/logo.svg" alt="Logo" objectFit="contain" width={50} height={50} />
        <div className='flex gap-4 items-center'>
        <FiBell size={20} />
            <div className='relative group flex items-center gap-2 border border-gray-400 rounded p-2'>
              <Image src='/user.png' alt='User' width={30} height={30} className='rounded-full cursor-pointer' />
              <span>John Doe</span>
              <FiChevronDown size={20} />
              <div className='absolute right-0 top-10 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <button 
                  className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between' 
                  onClick={() => {
                    localStorage.removeItem('auth');
                    window.location.reload();
                  }}
                >
                  <span>Logout</span>
                  <FiLogOut size={20} />
                </button>
              </div>
            </div>
        </div>
      </div>
      <Platform />
    </div>
  )
}

export default Currencies
