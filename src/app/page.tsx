"use client";
import { useState, useEffect } from "react";
import Checkbox from "@/components/Checkbox";
import Popform from "@/components/Popform";
import { useRouter, useSearchParams } from "next/navigation";
import { Toaster, toast } from 'sonner';
import Swal from 'sweetalert2';
import { sortItemsByPriority, sortItemsByDate, getCurrentItems } from '@/utility/SortingUtils';

interface TaskData {
  title: string;
  description: string;
  date: Date | string | null;
  category: string;
  priority: string;
}

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const showPopup = searchParams.get("showPopup") === "true";
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isPrioritySelected, setIsPrioritySelected] = useState(false);
  const [dateSortCount, setDateSortCount] = useState(0);
  const [prioritySortCount, setPrioritySortCount] = useState(0);
  const [data, setData] = useState<TaskData>({
    title: "",
    description: "",
    date: null,
    category: "",
    priority: ""
  });
  const [todoItems, setTodoItems] = useState<TaskData[]>([]);
  const [prioritySortedItems, setPrioritySortedItems] = useState<TaskData[]>([]);
  const [dateSortedItems, setDateSortedItems] = useState<TaskData[]>([]);
  const [currentView, setCurrentView] = useState<'default' | 'priority' | 'date'>('default');

  useEffect(() => {
    const existingItems = JSON.parse(localStorage.getItem("todoItems") || "[]");
    if (existingItems.length === 0) {
      const defaultItems = [
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
      setPrioritySortedItems(sortItemsByPriority(defaultItems));
      setDateSortedItems(sortItemsByDate(defaultItems));
    } else {
      setTodoItems(existingItems);
      setPrioritySortedItems(sortItemsByPriority(existingItems));
      setDateSortedItems(sortItemsByDate(existingItems));
    }
  }, []);

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
        setPrioritySortedItems([]);
        setDateSortedItems([]);
        localStorage.removeItem("todoItems");
        setCurrentView('default');
        setIsDateSelected(false);
        setIsPrioritySelected(false);

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
    router.push("?showPopup=true");
  };

  const ClosePopup = () => {
    router.push("/");
  };

  const handleOnStorage = () => {
    if (!data.title.trim()) {
      toast.error("Task title cannot be empty!", {
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

    const newTask: TaskData = {
      ...data,
      date: data.date ? new Date(data.date).toISOString() : null,
    };

    const existingItems = JSON.parse(localStorage.getItem("todoItems") || "[]");
    const updatedItems = [...existingItems, newTask];
    localStorage.setItem("todoItems", JSON.stringify(updatedItems));
    
    setTodoItems(updatedItems);
    setPrioritySortedItems(sortItemsByPriority(updatedItems));
    setDateSortedItems(sortItemsByDate(updatedItems));
    
    if (currentView === 'priority') {
      setCurrentView('priority');
    } else if (currentView === 'date') {
      setCurrentView('date');
    }

    setData({
      title: "",
      description: "",
      date: null,
      category: "",
      priority: ""
    });

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
    setPrioritySortedItems(sortItemsByPriority(updatedTasks));
    setDateSortedItems(sortItemsByDate(updatedTasks));
    localStorage.setItem("todoItems", JSON.stringify(updatedTasks));
    
    if (currentView === 'priority') {
      setCurrentView('priority');
    } else if (currentView === 'date') {
      setCurrentView('date');
    }
    
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

  const sortByDate = () => {
    setIsDateSelected((prev) => !prev);
    setDateSortCount((prev) => prev + 1);
    setIsPrioritySelected(false);
    
    if (!isDateSelected) {
      const sorted = sortItemsByDate(todoItems);
      setDateSortedItems(sorted);
      setCurrentView('date');
    } else {
      setCurrentView('default');
    }
    
    if ((dateSortCount + 1) % 2 === 1) {
      toast.success("Sorted by date proximity!", {
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
  };

  const sortByPriority = () => {
    setIsPrioritySelected((prev) => !prev);
    setPrioritySortCount((prev) => prev + 1);
    setIsDateSelected(false);
    
    if (!isPrioritySelected) {
      const sorted = sortItemsByPriority(todoItems);
      setPrioritySortedItems(sorted);
      setCurrentView('priority');
    } else {
      setCurrentView('default');
    }
    
    if ((prioritySortCount + 1) % 2 === 1) {
      toast.success("Sorted by priority!", {
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
  };

  return (
    <main className="h-screen pt-16">
      <div className="h-full flex flex-col max-w-2xl mx-auto p-8 gap-4">
        <p className="text-3xl md:text-5xl font-semibold mb-8 font-sans">Daily To Do List</p>
        <div className="relative max-w-2xl">
          <input
            type="text"
            value={data?.title || ""}
            placeholder="Add new list item"
            className="w-full px-4 py-4 rounded-md border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400 placeholder:font-thin text-black text-xl font-bold pr-24"
            readOnly
            onClick={OpenPopup}
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-blue-500 text-white font-medium text-xl rounded-md hover:bg-blue-600 transition-colors duration-200"
            onClick={handleOnStorage}
          >
            Add
          </button>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            className={`px-4 py-2 rounded-full ${
              isDateSelected 
                ? "bg-blue-100 text-blue-800 transform -translate-x-1" 
                : "bg-gray-200 text-gray-800"
            } transition`}
            onClick={sortByDate}
          >
            {isDateSelected ? "✓ Sort by Date" : "Sort by Date"}
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              isPrioritySelected 
                ? "bg-blue-100 text-blue-800 transform -translate-x-1" 
                : "bg-gray-200 text-gray-800"
            } transition`}
            onClick={sortByPriority}
          >
            {isPrioritySelected ? "✓ Sort by Priority" : "Sort by Priority"}
          </button>
        </div>

        <div className={`h-80 ${getCurrentItems(currentView, todoItems, prioritySortedItems, dateSortedItems).length > 5 ? "overflow-y-scroll" : "overflow-y-auto"} max-w-2xl`}>
          {getCurrentItems(currentView, todoItems, prioritySortedItems, dateSortedItems).map((item) => (
            <Checkbox key={item.title} text={item.title} data={item} onDelete={handleOnDelete} />
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 border-t max-w-2xl border-gray-200 text-gray-400 text-lg">
          <span>{getCurrentItems(currentView, todoItems, prioritySortedItems, dateSortedItems).length} items</span>
          <Toaster />
          <button
            className="hover:text-gray-600 transition-colors duration-200"
            onClick={onClearClick}
          >
            Clear All
          </button>
        </div>
        
        <div className="transition duration-500">
          <Popform
            isVisible={showPopup}
            onClose={ClosePopup}
            startDate={startDate}
            onDatechange={(date) => setStartDate(date)}
            onData={(data: TaskData) => setData(data)}
          />
        </div>
      </div>
    </main>
  );
}