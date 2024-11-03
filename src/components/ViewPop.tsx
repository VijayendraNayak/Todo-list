import { FC } from 'react';

interface ViewPopProps {
  isVisible: boolean;
  title: string;
  description: string;
  date: string;
  category: string;
  priority: string|number;
  onClose: () => void;
}

const ViewPop: FC<ViewPopProps> = ({ isVisible, title, description, date, category, priority, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-blue-100 rounded-lg w-full max-w-md p-6 shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">Task Details</h2>
        <div className="mb-2">
          <strong>Title:</strong> <span>{title}</span>
        </div>
        <div className="mb-2">
          <strong>Description:</strong> <span>{description}</span>
        </div>
        <div className="mb-2">
          <strong>Date:</strong> <span>{date}</span>
        </div>
        <div className="mb-2">
          <strong>Category:</strong> <span>{category}</span>
        </div>
        <div className="mb-2">
          <strong>Priority:</strong> <span>{priority}</span>
        </div>
        <div className='flex justify-center '>
          <button
            className="mt-4 px-8 py-3 font-semibold bg-blue-500 text-white rounded-md flex justify-center hover:bg-blue-600"
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
