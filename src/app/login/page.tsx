"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Page = () => {
  const [counter, setCounter] = useState(5); 
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    if (counter === 0) {
      router.push('/');
    }

    return () => clearInterval(timer);
  }, [counter, router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-white to-blue-400">
      <div className="bg-gradient-to-r from-green-400 to-white rounded-lg shadow-lg p-4 md:p-8 max-w-sm md:max-w-md text-center transform transition-all duration-500 hover:scale-105">
        <div className='flex justify-center'>
          <Image 
            src="/cropped_logo.png" 
            alt="Logo" 
            width={60} 
            height={60} 
            className="flex justify-center" 
          />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-4">
          This is a dummy page <span role="img" aria-label="smile">😅</span>
        </h1>
        <p className="text-md md:text-lg text-gray-600 mb-4 md:mb-6">
          You will be redirected to the <span className="font-bold text-blue-600 text-lg md:text-xl">HOME PAGE</span> in
        </p>
        <div className="text-4xl md:text-6xl font-extrabold text-red-500 animate-pulse">
          {counter}
        </div>
      </div>
    </div>
  );
};

export default Page;
