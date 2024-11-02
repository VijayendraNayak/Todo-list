"use client"
import { useState, useEffect } from "react";
import Checkbox from "@/components/Checkbox";
import Popform from "@/components/Popform";
import { useRouter, useSearchParams } from "next/navigation";
import { Toaster, toast } from 'sonner';
import Swal from 'sweetalert2';

interface TaskData {
  title: string;
  description: string;
  date: Date | null;
  category: string;
  priority: string;
}

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const showPopup = searchParams.get("showPopup") === "true";
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [data, setData] = useState<TaskData>({
    title: "",
    description: "",
    date: null,
    category: "",
    priority: ""
  });
  const [todoItems, setTodoItems] = useState<TaskData[]>([]);

  useEffect(() => {
    const existingItems = JSON.parse(localStorage.getItem("todoItems") || "[]");
    if (existingItems.length === 0) {
      const defaultItems = [
        {
          title: "Sample Task 1",
          description: "This is the first default task",
          date: new Date(),
          category: "Work",
          priority: "High"
        },
        {
          title: "Sample Task 2",
          description: "This is the second default task",
          date: new Date(),
          category: "Personal",
          priority: "Low"
        }
      ];
      localStorage.setItem("todoItems", JSON.stringify(defaultItems));
      setTodoItems(defaultItems);
    } else {
      setTodoItems(existingItems);
    }
  }, []);

  // const onClearClick = () => {
  //   setTodoItems([]);
  //   localStorage.removeItem("todoItems");
  
  //   toast.success("List cleared successfully!", {
  //     position: "top-right", // Position at the top right
  //     style: {
  //       backgroundColor: "#d4edda", // Light green background
  //       color: "#155724", // Dark green text
  //       borderLeft: "4px solid #85c79d", // Light green border on the left only
  //       borderRadius: "0.5rem", // Rounded corners
  //       padding: "1.5rem", // Padding for a cleaner look
  //     },
  //   });
  // };

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
        localStorage.removeItem("todoItems");
        
        toast.success("List cleared successfully!", {
          position: "top-right",
          style: {
            backgroundColor: "#d4edda",
            color: "#155724",
            borderLeft: "4px solid #85c79d",
            borderRadius: "0.5rem",
            padding: "1.5rem",
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
    if (data) {
      const existingItems = JSON.parse(localStorage.getItem("todoItems") || "[]");
      const updatedItems = [...existingItems, data];
      localStorage.setItem("todoItems", JSON.stringify(updatedItems));
      setTodoItems(updatedItems);
      setData({
        title: "",
        description: "",
        date: null,
        category: "",
        priority: ""
      });
    }
  };

  return (
    <main className="h-screen pt-16">
      <div className="h-full flex flex-col max-w-2xl mx-auto p-8 gap-4">
        <p className="text-5xl font-semibold mb-8 font-sans">Daily To Do List</p>
        <div className="relative max-w-2xl">
          <input
            type="text"
            value={data?.title || ""}
            placeholder="Add new list item"
            className="w-full px-4 py-4 rounded-md border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400 text-green-600 text-xl font-bold pr-24"
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
        <div className={`h-80 ${todoItems.length > 5 ? "overflow-y-scroll" : "overflow-y-auto"} max-w-2xl`}>
          {todoItems.map((item) => (
            <Checkbox key={item.title} text={item.title} />
          ))}
        </div>
        <div className="flex justify-between items-center pt-4 border-t max-w-2xl border-gray-200 text-gray-400 text-lg">
          <span>{todoItems.length} items</span>
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
