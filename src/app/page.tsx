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
    priority: "High" | "Medium" | "Low";
}

const sortItemsByPriority = (items: TaskData[]): TaskData[] => {
    const priorityOrder: { [key: string]: number } = { "High": 0, "Medium": 1, "Low": 2 };

    return [...items].sort((a, b) => {
        const priorityA = priorityOrder[a.priority] ?? 3;
        const priorityB = priorityOrder[b.priority] ?? 3;

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

const getCurrentItems = (
    currentView: 'default' | 'priority' | 'date',
    todoItems: TaskData[],
    prioritySortedItems: TaskData[],
    dateSortedItems: TaskData[]
): TaskData[] => {
    switch (currentView) {
        case 'priority':
            return prioritySortedItems;
        case 'date':
            return dateSortedItems;
        default:
            return todoItems;
    }
};

export default function Home() {
    const [showPopup, setShowPopup] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [isPrioritySelected, setIsPrioritySelected] = useState(false);
    const [dateSortCount, setDateSortCount] = useState(0);
    const [prioritySortCount, setPrioritySortCount] = useState(0);
    const [todoItems, setTodoItems] = useState<TaskData[]>([]);
    const [prioritySortedItems, setPrioritySortedItems] = useState<TaskData[]>([]);
    const [dateSortedItems, setDateSortedItems] = useState<TaskData[]>([]);
    const [currentView, setCurrentView] = useState<'default' | 'priority' | 'date'>('default');

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
        setShowPopup(true);
    };

    const ClosePopup = () => {
        setShowPopup(false);
        setStartDate(null);
    };

    const handleDateChange = (date: Date) => {
        setStartDate(date);
    };

    const handleOnStorage = (formData: TaskData) => {
        if (!formData.title.trim()) {
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

        const updatedItems = [...todoItems, formData];
        localStorage.setItem("todoItems", JSON.stringify(updatedItems));

        setTodoItems(updatedItems);
        setPrioritySortedItems(sortItemsByPriority(updatedItems));
        setDateSortedItems(sortItemsByDate(updatedItems));

        if (currentView === 'priority') {
            setCurrentView('priority');
        } else if (currentView === 'date') {
            setCurrentView('date');
        }

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

    const currentItems = getCurrentItems(currentView, todoItems, prioritySortedItems, dateSortedItems);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Toaster />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-gray-800">Todo List</h1>
                        <div className="flex gap-4">
                            <button
                                onClick={sortByDate}
                                className={`px-4 py-2 rounded-lg ${
                                    isDateSelected
                                        ? "bg-blue-500 text-white"
                                        : "bg-white text-gray-800"
                                }`}
                            >
                                Sort by Date
                            </button>
                            <button
                                onClick={sortByPriority}
                                className={`px-4 py-2 rounded-lg ${
                                    isPrioritySelected
                                        ? "bg-blue-500 text-white"
                                        : "bg-white text-gray-800"
                                }`}
                            >
                                Sort by Priority
                            </button>
                            <button
                                onClick={OpenPopup}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg"
                            >
                                Add Task
                            </button>
                            <button
                                onClick={onClearClick}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                            >
                                Clear All
                            </button>
                        </div>
                    </div>
                    
                    <div className="grid gap-4">
                        {currentItems.map((item, index) => (
                            <Checkbox
                                key={index}
                                title={item.title}
                                description={item.description}
                                date={item.date}
                                category={item.category}
                                priority={item.priority}
                                onDelete={() => handleOnDelete(item.title)}
                            />
                        ))}
                    </div>
                    
                    <Popform
                        isVisible={showPopup}
                        onClose={ClosePopup}
                        startDate={startDate}
                        onDatechange={handleDateChange}
                        onData={handleOnStorage}
                    />
                </div>
            </div>
        </div>
    );
}