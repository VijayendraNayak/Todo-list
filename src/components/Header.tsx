import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Props = Record<string, never>;

export default function Header({}: Props) {
  return (
    <header className='fixed top-0 left-0 z-50 w-full bg-purple-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto h-16 px-4 md:px-6'>
        <Link href="/">
          <div className='flex items-center space-x-2'>
            {/* New Logo Implementation */}
            <div className="relative flex items-center space-x-4 bg-white bg-opacity-90 p-2 rounded-2xl shadow-xl">
              <Image 
                src="/cropped_logo.png" 
                alt="Logo" 
                width={32} 
                height={32} 
                className="flex justify-center"
              />
              <div className='flex items-center'>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                  TaskFlow
                </h1>
              </div>
            </div>
          </div>
        </Link>
        <nav>
          <Link href="/login">
            <button className='px-4 py-1.5 md:px-6 md:py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors duration-300 font-semibold text-sm md:text-base'>
              Login
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
