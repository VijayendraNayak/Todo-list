"use client";
import { useState, useEffect } from "react";
import Checkbox from "@/components/Checkbox";
import Popform from "@/components/Popform";
import { Toaster, toast } from 'sonner';
import Swal from 'sweetalert2';

interface TaskData {
  title: string;
  description: string;
  date: string | null;
  category: string;
  priority: "High" | "Medium" | "Low" | -1; 
}

const sortItemsByPriority = (items: TaskData[]): TaskData[] => {
  const priorityOrder: { [key: string]: number } = { 
    "High": 0, 
    "Medium": 1, 
    "Low": 2, 
    "-1": 3  // Add handling for completed tasks
  };

  return [...items].sort((a, b) => {
    const priorityA = priorityOrder[a.priority.toString()] ?? 4;
    const priorityB = priorityOrder[b.priority.toString()] ?? 4;

    if (priorityA === priorityB && a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }

    return priorityA - priorityB;
  });
};


const sortItemsByDate = (items: TaskData[]): TaskData[] => {
  const currentDate = new Date().getTime();

  return [...items].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;

    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    const diffA = Math.abs(dateA - currentDate);
    const diffB = Math.abs(dateB - currentDate);

    return diffA - diffB;
  });
};

const filterItemsByCategory = (items: TaskData[], category: string): TaskData[] => {
  return items.filter(item => item.category.toLowerCase() === category.toLowerCase());
};

const getCurrentItems = (
  currentView: string,
  todoItems: TaskData[],
  dateSortedItems: TaskData[]
): TaskData[] => {
  // First sort by priority regardless of view
  const prioritySortedItems = sortItemsByPriority(todoItems);
  
  switch (currentView) {
    case 'date':
      return dateSortedItems;
    case 'home':
      return filterItemsByCategory(prioritySortedItems, 'home');
    case 'personal':
      return filterItemsByCategory(prioritySortedItems, 'personal');
    case 'work':
      return filterItemsByCategory(prioritySortedItems, 'work');
    default:
      return prioritySortedItems;
  }
};

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('default');
  const [dateSortCount, setDateSortCount] = useState(0);
  const [todoItems, setTodoItems] = useState<TaskData[]>([]);
  const [dateSortedItems, setDateSortedItems] = useState<TaskData[]>([]);
  const [formData, setFormData] = useState<TaskData>({
    title: "",
    description: "",
    date: null,
    category: "",
    priority: "Low"
  });

  useEffect(() => {
    const existingItems = JSON.parse(localStorage.getItem("todoItems") || "[]");
    if (existingItems.length === 0) {
      const defaultItems: TaskData[] = [
        {
          title: "Sample Task 1",
          description: "This is the first default task",
          date: new Date('2024-01-01').toISOString(),
          category: "Work",
          priority: "Low"
        },
        {
          title: "Sample Task 2",
          description: "This is the second default task",
          date: new Date('2024-02-01').toISOString(),
          category: "Personal",
          priority: "High"
        }
      ];
      localStorage.setItem("todoItems", JSON.stringify(defaultItems));
      setTodoItems(defaultItems);
      setDateSortedItems(sortItemsByDate(defaultItems));
    } else {
      setTodoItems(existingItems);
      setDateSortedItems(sortItemsByDate(existingItems));
    }
  }, []);
  const handlePriorityChange = (title: string, newPriority: "High" | "Medium" | "Low" | -1) => {
    const updatedTasks = todoItems.map(task => 
      task.title === title ? { ...task, priority: newPriority } : task
    );
    setTodoItems(updatedTasks);
    setDateSortedItems(sortItemsByDate(updatedTasks));
    localStorage.setItem("todoItems", JSON.stringify(updatedTasks));
  };
  const onClearClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear all!"
    }).then((result) => {
      if (result.isConfirmed) {
        setTodoItems([]);
        setDateSortedItems([]);
        localStorage.removeItem("todoItems");
        setActiveFilter('default');

        toast.success("List cleared successfully!", {
          position: "top-right",
          style: {
            backgroundColor: "#d4edda",
            color: "#155724",
            borderLeft: "4px solid #85c79d",
            borderRadius: "0.5rem",
            padding: "1.5rem",
            marginTop: "3rem"
          },
        });
      }
    });
  };

  const OpenPopup = () => {
    setShowPopup(true);
  };

  const ClosePopup = () => {
    setShowPopup(false);
    setStartDate(null);
    setFormData({
      title: "",
      description: "",
      date: null,
      category: "",
      priority: "Low"
    });
  };

  const handleDateChange = (date: Date) => {
    setStartDate(date);
  };

  const handleOnStorage = (formData: TaskData) => {
    if (!formData.title.trim()) {
      toast.error("Task Cannot be Empty!", {
        position: "top-right",
        style: {
          backgroundColor: "#f8d7da",
          color: "#721c24",
          borderLeft: "4px solid #e74c3c",
          borderRadius: "0.5rem",
          padding: "1.5rem",
          marginTop: "3rem"
        },
      });
      return;
    }

    const updatedItems = [...todoItems, formData];
    localStorage.setItem("todoItems", JSON.stringify(updatedItems));

    setTodoItems(updatedItems);
    setDateSortedItems(sortItemsByDate(updatedItems));

    ClosePopup();

    toast.success("Task added successfully!", {
      position: "top-right",
      style: {
        backgroundColor: "#d4edda",
        color: "#155724",
        borderLeft: "4px solid #85c79d",
        borderRadius: "0.5rem",
        padding: "1.5rem",
        marginTop: "3rem"
      },
    });
  };

  const handleOnDelete = (title: string) => {
    const updatedTasks = todoItems.filter((task) => task.title !== title);
    setTodoItems(updatedTasks);
    setDateSortedItems(sortItemsByDate(updatedTasks));
    localStorage.setItem("todoItems", JSON.stringify(updatedTasks));

    toast.success("Task deleted successfully!", {
      position: "top-right",
      style: {
        backgroundColor: "#d4edda",
        color: "#155724",
        borderLeft: "4px solid #85c79d",
        borderRadius: "0.5rem",
        padding: "1.5rem",
        marginTop: "3rem"
      },
    });
  };

  const handleFilterChange = (filter: string) => {
    // If clicking the same filter, reset to default view
    setActiveFilter(prevFilter => prevFilter === filter ? 'default' : filter);
    if (filter === 'date') {
      setDateSortCount(prev => prev + 1);
    }
  };

  const currentItems = getCurrentItems(activeFilter, todoItems, dateSortedItems);

  return (
    <main className="h-screen pt-16">
      <div className="h-full flex flex-col max-w-2xl mx-auto p-8 gap-4">
        <p className="text-3xl md:text-5xl font-semibold mb-8 font-sans">Daily To Do List</p>
        <div className="relative max-w-2xl">
          <input
            type="text"
            value={formData.title}
            placeholder="Add new list item"
            className="w-full px-4 py-4 rounded-md border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400 placeholder:font-thin text-black text-xl font-bold pr-24"
            readOnly
            onClick={OpenPopup}
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-blue-500 text-white font-medium text-xl rounded-md hover:bg-blue-600 transition-colors duration-200"
            onClick={() => handleOnStorage(formData)}
          >
            Add
          </button>
        </div>

        <div className="flex gap-4 mt-4 flex-wrap">
          <button
            className={`px-4 py-2 rounded-full ${
              activeFilter === 'date'
                ? "bg-blue-100 text-blue-800 transform -translate-x-1"
                : "bg-gray-200 text-gray-800"
            } transition`}
            onClick={() => handleFilterChange('date')}
          >
            {activeFilter === 'date' ? "✓ By Date" : "By Date"}
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              activeFilter === 'home'
                ? "bg-blue-100 text-blue-800 transform -translate-x-1"
                : "bg-gray-200 text-gray-800"
            } transition`}
            onClick={() => handleFilterChange('home')}
          >
            {activeFilter === 'home' ? "✓ Home" : "Home"}
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              activeFilter === 'personal'
                ? "bg-blue-100 text-blue-800 transform -translate-x-1"
                : "bg-gray-200 text-gray-800"
            } transition`}
            onClick={() => handleFilterChange('personal')}
          >
            {activeFilter === 'personal' ? "✓ Personal" : "Personal"}
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              activeFilter === 'work'
                ? "bg-blue-100 text-blue-800 transform -translate-x-1"
                : "bg-gray-200 text-gray-800"
            } transition`}
            onClick={() => handleFilterChange('work')}
          >
            {activeFilter === 'work' ? "✓ Work" : "Work"}
          </button>
        </div>

        <div className={`h-80 ${currentItems.length > 5 ? "overflow-y-scroll" : "overflow-y-auto"} max-w-2xl`}>
          {currentItems.map((item, index) => (
            <Checkbox
            key={index}
            title={item.title}
            description={item.description}
            date={item.date}
            category={item.category}
            priority={item.priority}
            onDelete={() => handleOnDelete(item.title)}
            onPriorityChange={handlePriorityChange}  // Add this line
          />
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 border-t max-w-2xl border-gray-200 text-gray-400 text-lg">
          <span>{currentItems.length} items</span>
          <Toaster />
          <button
            className="hover:text-gray-600 transition-colors duration-200"
            onClick={onClearClick}
          >
            Clear All
          </button>
        </div>

        <Popform
          isVisible={showPopup}
          onClose={ClosePopup}
          startDate={startDate}
          onDatechange={handleDateChange}
          onData={handleOnStorage}
        />
      </div>
    </main>
  );
}