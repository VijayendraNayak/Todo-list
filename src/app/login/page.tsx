"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Cloud } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-20 left-40 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-40 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        {/* Decorative Clouds */}
        <Cloud className="absolute top-20 left-10 text-white opacity-40" size={64} />
        <Cloud className="absolute top-40 right-20 text-white opacity-30" size={48} />
        <Cloud className="absolute bottom-40 left-1/4 text-white opacity-20" size={56} />
      </div>

      {/* Main Content */}
      <div className="relative rounded-lg shadow-lg p-4 bg-gradient-to-r from-purple-50 to-blue-50 md:p-8 max-w-sm md:max-w-md text-center transform transition-all duration-500 hover:scale-105">
        {/* Overlay Effect for Main Content */}
        <div className="absolute inset-0 rounded-lg opacity-30 blur-lg"></div>
        <div className='flex justify-center relative z-10'>
          <Image 
            src="/finedine.jpeg" 
            alt="Logo" 
            width={60} 
            height={60} 
            className="flex justify-center" 
          />
        </div>
        <h1 className="text-2xl md:text-3xl  font-bold text-gray-800 mb-2 md:mb-4 relative z-10">
          This is a dummy page <span role="img" aria-label="smile">😅</span>
        </h1>
        <p className="text-md md:text-lg text-gray-600 mb-4 md:mb-6 relative z-10">
          You will be redirected to the <span className="font-bold text-blue-600 text-lg md:text-xl">HOME PAGE</span> in
        </p>
        <div className="text-4xl md:text-6xl font-extrabold text-red-500 animate-pulse relative z-10">
          {counter}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Page;
