import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const AddTask = () => {
    const navigate = useNavigate();
    const [newTask, setNewTask] = useState({ title: "", description: "", category: "To-Do" });

    const categories = ["To-Do", "In Progress", "Done"];

    const addTask = async () => {
        if (!newTask.title.trim()) {
            alert("Title is required.");
            return;
        }

        try {
            await axios.post("https://job-task-server-chi-gilt.vercel.app/tasks", {
                title: newTask.title,
                description: newTask.description,
                category: newTask.category,
                timestamp: new Date(),
            });

            // Navigate to Show Tasks page
            navigate("/tasks");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
        <div className="min-h-screen bg-base-100 flex flex-col">
            <Navbar />

            <div className="flex flex-col items-center justify-center flex-grow p-6">
                <div className="bg-base-300 shadow-lg rounded-2xl p-8 w-full max-w-lg">
                    <h1 className="text-3xl font-bold  text-center mb-6">Add New Task</h1>

                    <div className="space-y-4">
                        <div>
                            <label className="block  font-medium mb-1">Title</label>
                            <input
                                type="text"
                                placeholder="Enter task title..."
                                value={newTask.title}
                                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                maxLength={50}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Description</label>
                            <textarea
                                placeholder="Enter task description (optional)..."
                                value={newTask.description}
                                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                maxLength={200}
                                rows="3"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Category</label>
                            <select
                                value={newTask.category}
                                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <button
                            className="w-1/3 py-2 px-4 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200"
                            onClick={() => navigate("/tasks")}
                        >
                            Cancel
                        </button>
                        <button
                            className="w-1/3 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                            onClick={addTask}
                        >
                            Add Task
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTask;
