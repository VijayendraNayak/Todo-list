import { FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LuCalendarCheck2 } from "react-icons/lu";
import { FaHome } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import ParentDropdown from "./ParentDrop";
import { FaExclamationTriangle, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

interface PopformProps {
    isVisible: boolean;
    onClose: () => void;
    startDate: Date | null;
    onDatechange: (date: Date) => void;
}

const Popform: FC<PopformProps> = ({ isVisible, onClose, startDate, onDatechange }) => {
    if (!isVisible) return null;
    const categoryOptions = [
        { label: "Home", icon: FaHome, color: "text-red-500" },
        { label: "Work", icon: MdWork, color: "text-yellow-500" },
        { label: "Personal", icon: IoPersonSharp, color: "text-green-500" },
    ];
    const priorityOptions = [
        { label: "High", icon: FaExclamationTriangle, color: "text-red-500" },
        { label: "Medium", icon: FaExclamationCircle, color: "text-yellow-500" },
        { label: "Low", icon: FaCheckCircle, color: "text-green-500" },
    ];
    return (
        <div className="inset-0 fixed flex items-center justify-center bg-black bg-opacity-50 z-index-50">
            <div className=" flex flex-col bg-white rounded-lg w-full max-w-xl p-6 shadow-lg gap-4">
                <h2 className="text-4xl font-sans font-semibold my-2 flex justify-center mb-5">
                    Add new Task
                </h2>
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Task Name"
                        className="border-2 w-full p-3 rounded-md focus:outline-none focus:border-3 focus:border-blue-400 "
                    />
                    <textarea placeholder="Description" className="border-2 focus:outline-none focus:border-3 w-full p-3 rounded-md focus:border-blue-400"></textarea>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="relative w-1/3">
                        <DatePicker
                            selected={startDate}
                            onChange={onDatechange}
                            placeholderText="Select a Date"
                            className="border-2 w-full p-3 rounded-md focus:outline-none focus:border-blue-400"
                        />
                        <LuCalendarCheck2 className="absolute right-2 top-3 text-gray-500 text-2xl" />
                    </div>
                    <div className="w-1/3">
                        <ParentDropdown label="category" options={categoryOptions} />
                    </div>
                    <div className="w-1/3">
                        <ParentDropdown label="priority" options={priorityOptions} />
                    </div>

                </div>
                <div className="flex gap-4 justify-center">
                    <button className="p-2 px-5 bg-gray-400 rounded-md cursor-pointer text-white font-sans font-semibold hover:bg-gray-600 transition hover:scale-110 duration-300 "
                        onClick={onClose}
                    >
                        Cancle
                    </button>
                    <button className="p-2 px-5 bg-blue-400 rounded-md cursor-pointer text-white font-sans font-semibold hover:bg-blue-600 transition hover:scale-110 duration-300 "
                        onClick={onClose}
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Popform;