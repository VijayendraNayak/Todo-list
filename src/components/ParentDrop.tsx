import { useState, FC } from "react";

interface DropdownOption {
    label: string;
    icon: FC<{ className: string }>; 
    color: string; 
}

interface DropdownProps {
    label: string;
    options: DropdownOption[];
}

const ParentDropdown: FC<DropdownProps> = ({ label, options }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option: DropdownOption) => {
        setSelectedOption(option.label);
        setIsOpen(false); 
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen); 
    };

    return (
        <div
            className={`relative w-full p-3 rounded-md border-2 ${
                isOpen ? "border-blue-400" : "border-gray-200"
            }`}
        >
            <div
                onClick={toggleDropdown}
                className="cursor-pointer flex items-center justify-between"
            >
                <span className={`${selectedOption ? "text-black" : "text-gray-400"}`}>
                    {selectedOption || label}
                </span>
                <span className="text-gray-500">{isOpen ? "▲" : "▼"}</span>
            </div>
            {isOpen && (
                <div className="absolute w-full mt-1 bg-white shadow-lg rounded-md z-10">
                    {options.map((option) => (
                        <div
                            key={option.label}
                            onClick={() => handleSelect(option)}
                            className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer"
                        >
                            <option.icon className={`${option.color} text-lg`} />
                            <span className="text-black">{option.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ParentDropdown;
