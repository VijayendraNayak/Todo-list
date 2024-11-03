
export interface TaskData {
  id: number;
  title: string;
  priority: "High" | "Medium" | "Low";
  date?: string;
  // Add other properties if necessary
}
export const sortItemsByPriority = (items: TaskData[]) => {
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

// Helper function for date sorting based on proximity to current date
export const sortItemsByDate = (items: TaskData[]) => {
  const currentDate = new Date().getTime();
  
  return [...items].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    
    // Calculate absolute difference from current date
    const diffA = Math.abs(dateA - currentDate);
    const diffB = Math.abs(dateB - currentDate);
    
    return diffA - diffB; // Closest dates appear first
  });
};

export const getCurrentItems = (
  currentView: 'default' | 'priority' | 'date',
  todoItems: TaskData[],
  prioritySortedItems: TaskData[],
  dateSortedItems: TaskData[]
) => {
  switch (currentView) {
    case 'priority':
      return prioritySortedItems;
    case 'date':
      return dateSortedItems;
    default:
      return todoItems;
  }
};