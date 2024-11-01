import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";

const CategoryDropdown = () => {
    const [selectedCategory, setSelectedCategory] = useState("Category");
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (category) => {
        setSelectedCategory(category);
        setIsOpen(false); // Close dropdown after selection
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen); // Toggle dropdown visibility
    };

    return (
        <div className={`relative w-full p-3 text-gray-400 rounded-md border-2 ${
            isOpen ? "border-blue-400" : "border-gray-200"
        }`}
>
            <div
                onClick={toggleDropdown}
                className="cursor-pointer flex items-center justify-between"
            >
                <span>{selectedCategory}</span>
                <span className="text-gray-500">{isOpen ? "▲" : "▼"}</span>
            </div>
            {isOpen && (
                <div className="absolute w-full mt-1 bg-white shadow-lg rounded-md z-10">
                    <div
                        onClick={() => handleSelect("Home")}
                        className="flex items-center gap-2 p-3 hover:text-red-500 cursor-pointer"
                    >
                        <FaHome className="text-red-500" /> Home
                    </div>
                    <div
                        onClick={() => handleSelect("Work")}
                        className="flex items-center gap-2 p-3 hover:text-yellow-500 cursor-pointer"
                    >
                        <MdWork className="text-yellow-500" /> Work
                    </div>
                    <div
                        onClick={() => handleSelect("Personal")}
                        className="flex items-center gap-2 p-3 hover:text-green-500 cursor-pointer"
                    >
                        <IoPersonSharp className="text-green-500" /> Personal
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryDropdown;
