"use client";
import { Check, X, Edit } from 'lucide-react';
import { useState } from 'react';
import UpdatePop from './UpdatePop';

interface CheckboxProps {
  title: string;
  description: string;
  date: string | null;
  category: string;
  priority: "High" | "Medium" | "Low";
  onDelete: (title: string) => void;
}

export default function Checkbox({ 
  title,
  date,
  category,
  priority,
  onDelete 
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [isPopVisible, setIsPopVisible] = useState(false);

  const handleDeleteClick = () => {
    onDelete(title);
  };

  const handleEditClick = () => {
    setIsPopVisible(true);
  };

  // Format the date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get priority color
  const getPriorityColor = (priority: "High" | "Medium" | "Low") => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="flex items-center gap-2 p-3 rounded-lg max-w-xl group justify-between transition-colors duration-200 hover:bg-gray-50">
      <div className="flex gap-2 items-center flex-1">
        <button
          onClick={() => setIsChecked(!isChecked)}
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            isChecked ? 'bg-green-500 border-green-500' : 'border-gray-300'
          }`}
        >
          {isChecked && <Check size={12} color="white" strokeWidth={2.5} />}
        </button>
        <div className="flex flex-col">
          <span
            className={`text-base ${
              isChecked ? 'text-gray-500 line-through group-hover:text-gray-400' : 'text-gray-700 group-hover:text-blue-400'
            }`}
          >
            {title}
          </span>
          <div className="flex gap-2 text-xs text-gray-500">
            {date && (
              <span className="flex items-center gap-1">
                {formatDate(date)}
              </span>
            )}
            {category && (
              <span className="px-1.5 py-0.5 bg-gray-100 rounded-full">
                {category}
              </span>
            )}
            {priority && (
              <span className={`${getPriorityColor(priority)} font-medium`}>
                {priority}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          className="text-green-500 p-1 rounded-full hover:bg-green-100"
          onClick={handleEditClick}
        >
          <Edit size={16} />
        </button>
        <button
          className="text-red-500 p-1 rounded-full hover:bg-red-100"
          onClick={handleDeleteClick}
        >
          <X size={16} />
        </button>
      </div>
      {isPopVisible && (
        <UpdatePop
          isVisible={isPopVisible}
          title={title}
          onClose={() => setIsPopVisible(false)}
        />
      )}
    </div>
  );
}