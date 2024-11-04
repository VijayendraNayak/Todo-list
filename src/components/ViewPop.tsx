import { FC } from 'react';

interface ViewPopProps {
  isVisible: boolean;
  title: string;
  description: string;
  date: string;
  category: string;
  priority: string | number;
  onClose: () => void;
}

const ViewPop: FC<ViewPopProps> = ({ isVisible, title, description, date, category, priority, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-full max-w-xs sm:max-w-md p-6 sm:p-8 shadow-xl mx-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-700">Task Details</h2>
        
        <div className="space-y-3">
          <div className="flex gap-2">
            <strong className="text-gray-700 min-w-[100px]">Title:</strong>
            <span className="text-gray-900 font-medium">{title}</span>
          </div>
          <div className="flex gap-2">
            <strong className="text-gray-700 min-w-[100px]">Description:</strong>
            <span className="text-gray-900 font-medium">{description}</span>
          </div>
          <div className="flex gap-2">
            <strong className="text-gray-700 min-w-[100px]">Date:</strong>
            <span className="text-gray-900 font-medium">{date}</span>
          </div>
          <div className="flex gap-2">
            <strong className="text-gray-700 min-w-[100px]">Category:</strong>
            <span className="text-gray-900 font-medium">{category}</span>
          </div>
          <div className="flex gap-2">
            <strong className="text-gray-700 min-w-[100px]">Priority:</strong>
            <span className={`font-medium ${priority === "High" ? "text-red-500" : priority === "Medium" ? "text-yellow-500" : "text-green-500"}`}>
              {priority}
            </span>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            className="px-8 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-105 active:scale-95"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPop;
