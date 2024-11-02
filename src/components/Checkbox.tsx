"use client"
import { Check } from 'lucide-react';
import { useState } from 'react';

interface CheckboxProps {
  text: string;
}

export default function Checkbox({ text }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex items-center gap-3 p-4 rounded-lg max-w-2xl group">
      <button 
        onClick={() => setIsChecked(!isChecked)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
          isChecked 
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
  );
}