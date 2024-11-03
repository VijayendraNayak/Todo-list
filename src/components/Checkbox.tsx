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
  priority: "High" | "Medium" | "Low" | -1;
  onDelete: (title: string) => void;
  onPriorityChange?: (title: string, priority: "High" | "Medium" | "Low" | -1) => void;
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
  const [isPopVisible, setIsPopVisible] = useState(false);
  const [isViewPopVisible, setIsViewPopVisible] = useState(false);
  const [originalPriority, setOriginalPriority] = useState<"High" | "Medium" | "Low" | -1>(
    priority === -1 ? "Medium" : priority // Set a default if completed
  );

  const handleCheckboxToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newPriority = priority === -1 ? originalPriority : -1;
    
    if (newPriority === -1) {
      // Storing original priority before marking as completed
      setOriginalPriority(priority);
    }
    
    onPriorityChange?.(title, newPriority);
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
    // Update originalPriority only when priority changes and is not -1
    if (priority !== -1) {
      setOriginalPriority(priority);
    }
  }, [priority]);

  const isChecked = priority === -1;

  return (
    <div
      className="checkbox-component flex items-center gap-2 p-2 sm:p-3 rounded-md max-w-full sm:max-w-xl group justify-between transition-colors duration-200 hover:bg-gray-50"
    >
      <div className="flex gap-2 items-center flex-1">
        <button
          onClick={handleCheckboxToggle}
          className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center ${isChecked ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}
        >
          {isChecked && <Check size={10} color="white" strokeWidth={2.5} />}
        </button>
        <div className="flex flex-col">
          <span
            className={`text-sm sm:text-base ${isChecked ? 'text-gray-500 line-through group-hover:text-gray-400' : 'text-gray-700 group-hover:text-blue-400'}`}
          >
            {title}
          </span>
          <div className="flex gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
            {date && (
              <span className="flex items-center gap-1 min-w-[60px] sm:min-w-[80px]">
                {formatDate(date)}
              </span>
            )}
            {category && (
              <span className={`px-1 py-0.5 sm:px-1.5 sm:py-0.5 rounded-full ${getCategoryColor(category)} min-w-[60px] sm:min-w-[80px]`}>
                {category}
              </span>
            )}
            {priority !== undefined && (
              <span className={`${getPriorityColor(priority)} font-medium min-w-[50px] sm:min-w-[60px]`}>
                {priority === -1 ? 'Completed' : priority}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-2 sm:gap-3 transition-opacity duration-200 opacity-100 md:opacity-0 group-hover:opacity-100">
        <button
          className="text-blue-500 p-1 rounded-full hover:bg-blue-100"
          onClick={handleViewClick}
        >
          <Eye size={14} />
        </button>
        {priority !== -1 && (
          <button
            className="text-green-500 p-1 rounded-full hover:bg-green-100"
            onClick={handleEditClick}
          >
            <Edit size={14} />
          </button>
        )}
        <button
          className="text-red-500 p-1 rounded-full hover:bg-red-100"
          onClick={handleDeleteClick}
        >
          <X size={14} />
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
          priority={priority}
          onClose={() => setIsViewPopVisible(false)}
        />
      )}
    </div>
  );
}