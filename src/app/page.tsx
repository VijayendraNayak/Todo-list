"use client"
import { useState } from "react";
import Checkbox from "@/components/Checkbox";
import Popform from "@/components/Popform"
import { useRouter, useSearchParams } from "next/navigation"
export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const showPopup = searchParams.get("showPopup") === "true";
  const [startDate, setStartDate] = useState<Date | null>(null); // Manage date state

  const OpenPopup = () => {
    router.push("?showPopup=true");
  }

  const ClosePopup = () => {
    router.push("/");
  }
  return (
    <main className="h-screen pt-16">
      <div className="h-full flex flex-col max-w-2xl mx-auto p-8 gap-4">
        <p className="text-5xl font-semibold mb-8 font-sans">
          Daily To Do List
        </p>
        <div className="relative max-w-2xl">
          <input
            type="text"
            placeholder="Add new list item"
            className="w-full px-4 py-4 rounded-md border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400 text-gray-600 pr-24"
            onClick={OpenPopup}
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-blue-500 text-white font-medium text-xl rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Add
          </button>
        </div>
        <div className="h-80 hover:overflow-y-scroll max-w-2xl">
          <Checkbox />
          <Checkbox />
          <Checkbox />
        </div>

        <div className="flex justify-between items-center pt-4 border-t max-w-2xl border-gray-200 text-gray-400 text-lg">
          <span>3 items</span>
          <button className="hover:text-gray-600 transition-colors duration-200">Clear All</button>
        </div>
        {/* <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"> */}
        <div>
          <Popform
            isVisible={showPopup}
            onClose={ClosePopup}
            startDate={startDate} 
            onDatechange={(date) => setStartDate(date)} 
          />
        </div>
      </div>
    </main>
  );
}
