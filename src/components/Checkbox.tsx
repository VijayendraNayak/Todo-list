"use client"
import { Check } from 'lucide-react';
import { useState } from 'react';
import { FaRegCircleXmark } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";

interface CheckboxProps {
  text: string;
  onDelete:(title:string)=>void;
}

export default function Checkbox({ text ,onDelete}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(false);
  
  const handleDeleteClick = () => {
    onDelete(text);
  };

  return (
    <div className="flex items-center gap-3 p-4 rounded-lg max-w-2xl group justify-between">
      <div className="flex gap-3 items-center">
        <button
          onClick={() => setIsChecked(!isChecked)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${isChecked
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 hover:border-green-500'
            }`}
        >
          {isChecked && <Check size={14} color="white" strokeWidth={3} />}
        </button>
        <span
          className={`text-lg transition-all duration-200 
          ${isChecked
              ? 'text-gray-400 line-through'
              : 'text-gray-700 group-hover:text-blue-500'
            }`}
        >
          {text}
        </span>
      </div>
      <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button className="text-green-500 text-2xl p-2 hover:bg-green-500 hover:text-white hover:rounded-full">
          <MdOutlineEdit />
        </button>
        <button className="text-red-500 text-2xl p-2 hover:bg-red-500 hover:text-white hover:rounded-full"
          onClick={handleDeleteClick} 
        >
          <FaRegCircleXmark />
        </button>
      </div>
    </div>
  );
}
