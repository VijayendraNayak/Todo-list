"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
      <div className="bg-gradient-to-r from-green-400 to-white rounded-lg shadow-lg p-8 max-w-md text-center transform transition-all duration-500 hover:scale-105">
        <div className='flex justify-center'>

      <img src="/cropped_logo.png" alt="Logo" className="h-20 w-20 flex justify-center" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          This is a dummy page <span role="img" aria-label="smile">😅</span>
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          You will be redirected to the <span className="font-bold text-blue-600 text-xl">HOME PAGE</span> in
        </p>
        <div className="text-6xl font-extrabold text-red-500 animate-pulse">
          {counter}
        </div>
      </div>
    </div>
  );
};

export default Page;
