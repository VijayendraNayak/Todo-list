import React from 'react';

type Props = Record<string, never>;

export default function Header({}: Props) {
  return (
    <header className='fixed top-0 left-0 z-50 w-full bg-blue-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto h-16 px-4'>
        <div className='flex items-center space-x-2'>
          <div className='flex items-center'>
            <span className='text-gray-800 font-bold text-3xl'>Todo</span>
            <span className='text-blue-500 font-bold text-3xl'>.</span>
            <span className='text-gray-500 font-medium text-xl ml-1.5'>List</span>
          </div>
        </div>
        <nav>
          <button className='px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 font-semibold text-base'>
            Login
          </button>
        </nav>
      </div>
    </header>
  );
}
