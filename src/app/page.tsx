export default function Home() {
  return (
    <main className="h-screen pt-16">
      <div className="h-[calc(100vh-64px)] flex flex-col max-w-4xl mx-auto p-8">
        <p className="text-5xl font-semibold mb-8">
          Daily To Do List
        </p>
        <div className="relative max-w-2xl ">
          <input
            type="text"
            placeholder="Add new list item"
            className="w-full px-4 py-4 rounded-md border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400 text-gray-600 pr-24"
          />
          <button 
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-blue-500 text-white font-medium text-xl rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Add
          </button>
        </div>
      </div>
    </main>
  );
}