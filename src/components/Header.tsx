import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
type Props = Record<string, never>;

export default function Header({}: Props) {
  return (
    <header className='fixed top-0 left-0 z-50 w-full bg-blue-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto h-16 px-4 md:px-6'>
        <Link href="/">
          <div className='flex items-center space-x-2'>
            <Image 
              src="/cropped_logo.png" 
              alt="Logo" 
              width={32} 
              height={32} 
              className="flex justify-center"
            />
            <div className='flex items-center'>
              <span className='text-gray-800 font-bold text-2xl md:text-3xl'>Todo</span>
              <span className='text-blue-500 font-bold text-2xl md:text-3xl'>.</span>
              <span className='text-gray-500 font-medium text-lg md:text-xl ml-1.5'>List</span>
            </div>
          </div>
        </Link>
        <nav>
          <Link href="/login">
            <button className='px-4 py-1.5 md:px-6 md:py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 font-semibold text-sm md:text-base'>
              Login
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
