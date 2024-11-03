"use client";
import { Check, X, Edit, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import UpdatePop from './UpdatePop';
import ViewPop from './ViewPop';

interface CheckboxProps {
  title: string;
  description: string;
  date: string | null;
  category: string;
  priority: "High" | "Medium" | "Low" | -1;  // Updated to allow -1
  onDelete: (title: string) => void;
  onPriorityChange?: (title: string, priority: "High" | "Medium" | "Low" | -1) => void;  // New prop for handling priority changes
}


export default function Checkbox({
  title,
  description,
  date,
  category,
  priority,
  onDelete,
  onPriorityChange
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(priority === -1);
    const [isPopVisible, setIsPopVisible] = useState(false);
  const [isViewPopVisible, setIsViewPopVisible] = useState(false);
  const [currentPriority, setCurrentPriority] = useState(priority);

  const handleCheckboxToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    
    if (newCheckedState) {
      // If checkbox is being checked, set priority to -1
      setCurrentPriority(-1);
      onPriorityChange?.(title, -1);
    } else {
      // If unchecking, reset to default priority (you might want to store the original priority)
      setCurrentPriority(priority);
      onPriorityChange?.(title, priority);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(title);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPopVisible(true);
  };

  const handleViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsViewPopVisible(true);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPriorityColor = (priority: "High" | "Medium" | "Low" | -1) => {
    if (priority === -1) return 'text-gray-400';
    
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

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'home':
        return 'bg-violet-100 text-violet-700';
      case 'personal':
        return 'bg-cyan-100 text-cyan-700';
      case 'work':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  useEffect(() => {
    setIsChecked(priority === -1);
    setCurrentPriority(priority);
  }, [priority]);

  return (
    <div
      className="checkbox-component flex items-center gap-2 p-3 rounded-lg max-w-xl group justify-between transition-colors duration-200 hover:bg-gray-50"
    >
      <div className="flex gap-2 items-center flex-1">
        <button
          onClick={handleCheckboxToggle}
          className={`checkbox-component w-5 h-5 rounded-full border-2 flex items-center justify-center ${
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
              <span className="flex items-center gap-1 min-w-[80px]">
                {formatDate(date)}
              </span>
            )}
            {category && (
              <span className={`px-1.5 py-0.5 text-black rounded-full min-w-[80px] ${getCategoryColor(category)}`}>
                {category}
              </span>
            )}
            {currentPriority !== undefined && (
              <span className={`${getPriorityColor(currentPriority)} font-medium min-w-[60px]`}>
                {currentPriority === -1 ? 'Completed' : currentPriority}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-3 transition-opacity duration-200 opacity-100 md:opacity-0 group-hover:opacity-100">
        <button
          className="text-blue-500 p-1 rounded-full hover:bg-blue-100"
          onClick={handleViewClick}
        >
          <Eye size={16} />
        </button>
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

      {isViewPopVisible && (
        <ViewPop
          isVisible={isViewPopVisible}
          title={title}
          description={description}
          date={formatDate(date)}
          category={category}
          priority={currentPriority}
          onClose={() => setIsViewPopVisible(false)}
        />
      )}
    </div>
  );
}
