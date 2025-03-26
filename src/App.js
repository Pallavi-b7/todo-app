import { useState, useEffect } from "react";
import { FaMoon, FaSun, FaEdit, FaTrash } from "react-icons/fa";
import { BsPlusCircle } from "react-icons/bs";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    document.body.className = theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black";
    localStorage.setItem("theme", theme);
    console.log("Theme applied:", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const addTask = () => {
    if (task.trim() !== "") {
      if (editIndex !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex].text = task;
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        setTasks([...tasks, { text: task, completed: false }]);
      }
      setTask("");
    }
  };

  const toggleTask = (index) => {
    setTasks(tasks.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setTask(tasks[index].text);
    setEditIndex(index);
  };

  const filteredTasks = tasks
    .filter((t) => (filter === "completed" ? t.completed : filter === "incomplete" ? !t.completed : true))
    .filter((t) => t.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen flex flex-col items-center p-6 transition-all duration-300">
      <div className={`w-full max-w-lg p-4 rounded-lg shadow-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Todo List</h1>
          <button onClick={toggleTheme} className="text-xl">{theme === "dark" ? <FaSun /> : <FaMoon />}</button>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Search tasks..."
            className={`w-full p-2 rounded-lg border ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white border-gray-300"}`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 mb-4">
          <button onClick={() => setFilter("all")} className={`px-3 py-1 rounded-md ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>All</button>
          <button onClick={() => setFilter("completed")} className={`px-3 py-1 rounded-md ${filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Completed</button>
          <button onClick={() => setFilter("incomplete")} className={`px-3 py-1 rounded-md ${filter === "incomplete" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Incomplete</button>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Add a task..."
            className={`w-full p-2 rounded-lg border ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white border-gray-300"}`}
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={addTask} className="text-2xl text-blue-500"><BsPlusCircle /></button>
        </div>

        <ul>
          {filteredTasks.map((t, index) => (
            <li key={index} className={`flex justify-between items-center p-2 border-b ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
              <span onClick={() => toggleTask(index)} className={`cursor-pointer ${t.completed ? "line-through text-gray-500" : ""}`}>{t.text}</span>
              <div className="flex gap-2">
                <button onClick={() => editTask(index)} className="text-yellow-500"><FaEdit /></button>
                <button onClick={() => deleteTask(index)} className="text-red-500"><FaTrash /></button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
