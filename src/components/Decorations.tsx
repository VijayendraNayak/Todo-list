import React from "react";
import { Cloud } from "lucide-react";
import Image from "next/image";

const Decorations = () => {
  const scrollToNextScreen = () => {
    // Check if the viewport width is less than 768px (mobile devices)
    const isMobile = window.innerWidth < 768;
    // Calculate the scroll distance based on the viewport height
    const scrollDistance = isMobile
      ? window.innerHeight * 0.95
      : window.innerHeight * 1.2; // Scroll 75% of the viewport height for mobile, full height for desktop
    window.scrollBy({
      top: scrollDistance,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Hero Section */}
      <div className="min-h-[calc(100vh-50px)] md:min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex flex-col relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          {/* Animated Gradient Orbs */}
          <div className="absolute top-20 left-40 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-40 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

          {/* Decorative Clouds */}
          <Cloud
            className="absolute top-20 left-10 text-white opacity-40"
            size={64}
          />
          <Cloud
            className="absolute top-40 right-20 text-white opacity-30"
            size={48}
          />
          <Cloud
            className="absolute bottom-40 left-1/4 text-white opacity-20"
            size={56}
          />
        </div>

        {/* Main Content */}
        <div className="relative flex-1 flex items-center justify-center px-4 md:px-8 mx-4 -mt-16">
          <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left Side - Logo and App Name */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start space-y-6">
              <div className="relative">
                {/* Logo Background Circle */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full blur-lg opacity-50 transform scale-110"></div>
                {/* Logo Container */}
                <div className="relative flex items-center space-x-4 bg-white bg-opacity-90 p-3 lg:p-6 rounded-2xl shadow-xl">
                  <Image
                    src="/finedine.jpeg"
                    alt="Logo"
                    width={52}
                    height={52}
                    className="flex justify-center"
                  />
                  <h1 className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                    FineDine
                  </h1>
                </div>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 gap-4 w-full max-w-md mt-8">
                <div className="bg-white bg-opacity-90 p-2 lg:p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
                  <h3 className="font-semibold text-lg text-purple-600">
                    Time-Slot Booking
                  </h3>
                  <p className="text-gray-600">
                    Reserve your table effortlessly within your preferred time
                    slots.
                  </p>
                </div>
                <div className="bg-white bg-opacity-90 p-2 lg:p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
                  <h3 className="font-semibold text-lg text-blue-600">
                    No Double Booking
                  </h3>
                  <p className="text-gray-600">
                    Ensure exclusive table reservations with our no-concurrency
                    policy.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Taglines and CTA */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start space-y-8">
              <div className="space-y-6 text-center md:text-left">
                <h2 className="text-2xl md:text-4xl font-bold leading-tight">
                  <span className="block bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                    Elevate Your Dining Experience
                  </span>
                  <span className="block text-gray-700 mt-2">
                    One Reservation at a Time
                  </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-xl hidden lg:flex">
                  Enjoy seamless table reservations with our intuitive platform,
                  ensuring exclusive dining slots tailored just for you.
                </p>
              </div>

              {/* CTA Button */}
              <button onClick={scrollToNextScreen} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <div className="relative px-8 py-4 bg-white rounded-full leading-none flex items-center">
                  <span className="text-purple-600 group-hover:text-purple-700 transition duration-200 font-semibold">
                    Get Started Now
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
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
        .animate-tilt {
          animation: tilt 10s infinite linear;
        }
      `}</style>
    </>
  );
};

export default Decorations;
