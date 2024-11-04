import { FC, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LuCalendarCheck2 } from "react-icons/lu";
import { FaHome } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import ParentDropdown from "./ParentDrop";
import { FaExclamationTriangle, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import { Toaster, toast } from 'sonner';

interface PopformProps {
    isVisible: boolean;
    onClose: () => void;
    startDate: Date | null;
    onDatechange: (date: Date) => void;
    onData: (data: TaskData) => void;
    existingTasks: TaskData[];  // Add this line
}

interface TaskData {
    title: string;
    description: string;
    date: string | null;
    category: string;
    priority: "High" | "Medium" | "Low"|-1;
}

const Popform: FC<PopformProps> = ({ isVisible, onClose, startDate, onDatechange, onData, existingTasks }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Home");
    const [priority, setPriority] = useState<"High" | "Medium" | "Low">("High");

    if (!isVisible) return null;

    const categoryOptions = [
        { label: "Home", icon: FaHome, color: "text-red-500" },
        { label: "Work", icon: MdWork, color: "text-yellow-500" },
        { label: "Personal", icon: IoPersonSharp, color: "text-green-500" },
    ];

    const priorityOptions = [
        { label: "High" as const, icon: FaExclamationTriangle, color: "text-red-500" },
        { label: "Medium" as const, icon: FaExclamationCircle, color: "text-yellow-500" },
        { label: "Low" as const, icon: FaCheckCircle, color: "text-green-500" },
    ];

    const isDuplicateTask = (newTask: TaskData): boolean => {
        return existingTasks.some(task => {
            const sameTitle = task.title.toLowerCase().trim() === newTask.title.toLowerCase().trim();
            const sameDate = task.date === newTask.date;
            const sameCategory = task.category === newTask.category;
            const samePriority = task.priority === newTask.priority;
            const sameDescription = task.description.toLowerCase().trim() === newTask.description.toLowerCase().trim();
    
            return sameTitle && sameDate && sameCategory && samePriority && sameDescription;
        });
    };

    const handleOnDone = () => {
        // Check for empty fields
        if (!title.trim() || !description.trim() || !category || !priority) {
            toast.error("Please fill in all fields!", {
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

        const selectedDate = startDate || new Date();
        const newTask = {
            title: title.trim(),
            description: description.trim(),
            date: selectedDate.toISOString(),
            category,
            priority,
        };

        // Check for duplicates
        if (isDuplicateTask(newTask)) {
            toast.error("This task already exists!", {
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

        // If all checks pass, create the task
        onData(newTask);
        onClose();
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50`}>
            <div className="flex flex-col bg-white rounded-lg w-full max-w-md p-4 sm:p-6 shadow-lg gap-4 mx-4 sm:mx-0">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-sans font-semibold text-center mb-4">
                    Add new Task
                </h2>
                <div className="flex flex-col gap-2 sm:gap-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Task Name"
                        className="border-2 w-full p-2 sm:p-3 rounded-md focus:outline-none focus:border-blue-400"
                    />
                    <textarea
                        placeholder="Description"
                        className="border-2 w-full p-2 sm:p-3 rounded-md focus:outline-none focus:border-blue-400"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 sm:gap-4 items-center">
                    <div className="relative w-1/3 text-sm md:text-md">
                        <DatePicker
                            selected={startDate || new Date()}
                            onChange={(date) => onDatechange(date as Date)}
                            placeholderText="Select a Date"
                            className="border-2 w-full p-2 sm:p-3 rounded-md focus:outline-none focus:border-blue-400"
                        />
                        <LuCalendarCheck2 className="hidden absolute md:flex right-2 top-3 text-gray-500 text-lg" />
                    </div>
                    <div className="w-1/3 text-black">
                        <ParentDropdown
                            label="Category"
                            options={categoryOptions}
                            onSelect={(value) => setCategory(value || categoryOptions[0]?.label || "")}
                        />
                    </div>
                    <div className="w-1/3 text-black">
                        <ParentDropdown
                            label="Priority"
                            options={priorityOptions}
                            onSelect={(value) => setPriority((value as "High" | "Medium" | "Low") || priorityOptions[0]?.label)}
                        />
                    </div>
                </div>
                <div className="flex gap-2 sm:gap-4 justify-center mt-4">
                    <button
                        className="p-2 px-4 bg-gray-400 rounded-md text-white font-sans font-semibold hover:bg-gray-600 transition duration-200"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="p-2 px-4 bg-blue-400 rounded-md text-white font-sans font-semibold hover:bg-blue-600 transition duration-200"
                        onClick={handleOnDone}
                    >
                        Done
                    </button>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default Popform;