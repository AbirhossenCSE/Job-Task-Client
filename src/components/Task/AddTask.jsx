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
            await axios.post("http://localhost:5000/tasks", {
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
        <div>
            <Navbar></Navbar>

            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
                <h1 className="text-2xl font-bold mb-4">Add New Task</h1>
                <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                    <input
                        type="text"
                        placeholder="Title (Max 50 chars)"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        maxLength={50}
                        className="w-full p-2 border rounded mb-3"
                    />
                    <textarea
                        placeholder="Description (Optional, Max 200 chars)"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        maxLength={200}
                        className="w-full p-2 border rounded mb-3"
                    />

                    {/* Category Selection */}
                    <label className="block text-gray-700 mb-1">Select Category</label>
                    <select
                        value={newTask.category}
                        onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                        className="w-full p-2 border rounded mb-3"
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>

                    <div className="flex justify-between">
                        <button
                            className="bg-gray-400 text-white px-4 py-2 rounded"
                            onClick={() => navigate("/tasks")}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
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
