import { FC, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LuCalendarCheck2 } from "react-icons/lu";
import ParentDropdown from "./ParentDrop";
import { FaExclamationTriangle, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { toast } from 'sonner';

interface PopformProps {
    isVisible: boolean;
    title: string;
    onClose: () => void;
}

interface TaskData {
    title: string;
    description: string;
    date: Date | null;
    category: string;
    priority: string;
}

const UpdatePop: FC<PopformProps> = ({ isVisible, title, onClose }) => {
    const [formTitle, setFormTitle] = useState(title);
    const [description, setDescription] = useState("");
    const [date, setDate] = useState<Date | null>(null);
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState("");
    const [isModified, setIsModified] = useState(false);

    useEffect(() => {
        if (title) {
            const existingItems: TaskData[] = JSON.parse(localStorage.getItem("todoItems") || "[]");
            const foundTask = existingItems.find((task) => task.title === title);
            
            if (foundTask) {
                setFormTitle(foundTask.title);
                setDescription(foundTask.description);
                setDate(foundTask.date ? new Date(foundTask.date) : null);
                setCategory(foundTask.category);
                setPriority(foundTask.priority);
            }
        }
    }, [title]);

    const handleSave = async() => {
        if (!isModified) {
            toast.warning("No changes made to update!", {
                position: "top-right",
                style: {
                    backgroundColor: "#f9e79f",
                    color: "#856404",
                    borderLeft: "5px solid #d4ac0d ",
                    borderRadius: "0.5rem",
                    padding: "1.5rem",
                    marginTop: "3rem"
                },
            });
            return;
        }

        const updatedTask: TaskData = {
            title: formTitle,
            description,
            date,
            category,
            priority,
        };

        const existingItems: TaskData[] = JSON.parse(localStorage.getItem("todoItems") || "[]");
        const updatedItems = existingItems.map((item) =>
            item.title === title ? updatedTask : item
        );

        localStorage.setItem("todoItems", JSON.stringify(updatedItems));
        
        toast.success("Task updated successfully!", {
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

        onClose();
        await new Promise(resolve => setTimeout(resolve, 1000));
        window.location.reload();
    };

    const handleChange = () => {
        setIsModified(true);
    };

    if (!isVisible) return null;

    return (
        <div className="inset-0 fixed flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="flex flex-col bg-white rounded-lg w-full max-w-md p-4 sm:p-6 shadow-lg gap-4 mx-4 sm:mx-0"> {/* Adjusted max-w and padding */}
                <h2 className="text-3xl font-semibold text-center mb-4">Edit Task</h2> {/* Reduced font size */}
                <div className="flex flex-col gap-3">
                    <input
                        type="text"
                        value={formTitle}
                        onChange={(e) => {
                            setFormTitle(e.target.value);
                            handleChange();
                        }}
                        className="border-2 w-full p-2 rounded-md" // Adjusted padding
                    />
                    <textarea
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                            handleChange();
                        }}
                        className="border-2 w-full p-2 rounded-md" // Adjusted padding
                    />
                </div>
                <div className="flex gap-3 items-center">
                    <div className="relative w-1/3 text-sm">
                        <DatePicker
                            selected={date}
                            onChange={(selectedDate) => {
                                setDate(selectedDate);
                                handleChange();
                            }}
                            className="border-2 w-full p-2 rounded-md" // Adjusted padding
                        />
                        <LuCalendarCheck2 className="hidden md:flex absolute right-2 top-2 text-gray-500 text-xl" /> {/* Reduced icon size */}
                    </div>
                    <div className="w-1/3">
                        <ParentDropdown 
                            label="Category"
                            options={[
                                { label: "Home", icon: FaHome, color: "text-red-500" },
                                { label: "Work", icon: MdWork, color: "text-yellow-500" },
                                { label: "Personal", icon: IoPersonSharp, color: "text-green-500" },
                            ]}
                            onSelect={(value) => {
                                setCategory(value);
                                handleChange();
                            }}
                            selected={category}
                        />
                    </div>
                    <div className="w-1/3">
                        <ParentDropdown
                            label="Priority"
                            options={[
                                { label: "High", icon: FaExclamationTriangle, color: "text-red-500" },
                                { label: "Medium", icon: FaExclamationCircle, color: "text-yellow-500" },
                                { label: "Low", icon: FaCheckCircle, color: "text-green-500" },
                            ]}
                            onSelect={(value) => {
                                setPriority(value);
                                handleChange();
                            }}
                            selected={priority}
                        />
                    </div>
                </div>
                <div className="flex gap-3 justify-center">
                    <button className="p-2 px-4 bg-gray-400 rounded-md cursor-pointer text-white font-semibold hover:bg-gray-600 transition hover:scale-110 duration-300" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="p-2 px-4 bg-blue-400 rounded-md cursor-pointer text-white font-semibold hover:bg-blue-600 transition hover:scale-110 duration-300" onClick={handleSave}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdatePop;
