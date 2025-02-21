import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";

const EditTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({
        title: "",
        description: "",
        category: "To-Do",  // Default category
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchTask();
    }, []);

    const fetchTask = async () => {
        try {
            const response = await axios.get(`https://job-task-server-chi-gilt.vercel.app/tasks/${id}`);
            setTask(response.data);
        } catch (error) {
            console.error("Error fetching task:", error);
            setError("Failed to load task. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://job-task-server-chi-gilt.vercel.app/tasks/${id}`, task, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            navigate("/tasks");
        } catch (error) {
            console.error("Error updating task:", error.response?.data || error.message);
            setError("Failed to update task. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-base-100 min-h-screen">
            <Navbar />

            <div className="max-w-lg mx-auto mt-10 bg-base-300 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold dark:text-white mb-6 text-center">
                    Edit Task
                </h1>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-base-700 dark:text-gray-300 font-medium">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={task.title}
                            onChange={handleChange}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block  dark:text-gray-300 font-medium">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={task.description}
                            onChange={handleChange}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            rows="4"
                        />
                    </div>

                    {/* Category Dropdown */}
                    <div>
                        <label className="block  dark:text-gray-300 font-medium">
                            Category
                        </label>
                        <select
                            name="category"
                            value={task.category}
                            onChange={handleChange}
                            className="w-full rounded-lg px-3 py-2 mt-1"
                        >
                            <option value="To-Do">To-Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>


                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Update Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditTask;
