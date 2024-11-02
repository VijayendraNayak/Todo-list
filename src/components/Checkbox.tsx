"use client";
import { Check } from 'lucide-react';
import { useState } from 'react';
import { FaRegCircleXmark } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import UpdatePop from './UpdatePop';

interface CheckboxProps {
  text: string;
  onDelete: (title: string) => void;
}

export default function Checkbox({ text, onDelete }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [isPopVisible, setIsPopVisible] = useState(false);

  const handleDeleteClick = () => {
    onDelete(text);
  };

  const handleEditClick = () => {
    setIsPopVisible(true);
  };

  return (
    <div className="flex items-center gap-3 p-4 rounded-lg max-w-2xl group justify-between transition-colors duration-200">
      <div className="flex gap-3 items-center">
        <button
          onClick={() => setIsChecked(!isChecked)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isChecked ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}
        >
          {isChecked && <Check size={14} color="white" strokeWidth={3} />}
        </button>
        <span className={`text-lg ${isChecked ? 'text-gray-400 line-through' : 'text-gray-700'} group-hover:text-blue-400`}>
          {text}
        </span>
      </div>
      <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button className="text-green-500 text-2xl p-2 rounded-full hover:bg-green-500 hover:text-white" onClick={handleEditClick}>
          <MdOutlineEdit />
        </button>
        <button className="text-red-500 text-2xl p-2 rounded-full hover:bg-red-500 hover:text-white" onClick={handleDeleteClick}>
          <FaRegCircleXmark />
        </button>
      </div>
      {isPopVisible && (
        <UpdatePop
          isVisible={isPopVisible}
          title={text}
          onClose={() => setIsPopVisible(false)}
        />
      )}
    </div>
  );
}
