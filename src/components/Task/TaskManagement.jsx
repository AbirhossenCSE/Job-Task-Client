import { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

const TaskManagement = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const categories = ["To-Do", "In Progress", "Done"];

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get("https://job-task-server-chi-gilt.vercel.app/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const updatedTasks = [...tasks];
        const [movedTask] = updatedTasks.splice(result.source.index, 1);
        movedTask.category = categories[result.destination.droppableId];
        updatedTasks.splice(result.destination.index, 0, movedTask);

        setTasks(updatedTasks);

        try {
            await axios.put(`https://job-task-server-chi-gilt.vercel.app/tasks/${movedTask._id}`, {
                category: movedTask.category,
            });
        } catch (error) {
            console.error("Error updating task category:", error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`https://job-task-server-chi-gilt.vercel.app/tasks/${taskId}`);
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-base-100">
            <Navbar />

            <main className="flex-grow p-6 flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-6">Task Management</h1>
                <button
                    className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-600 transition"
                    onClick={() => navigate("/addTask")}
                >
                    + Add New Task
                </button>

                <DragDropContext onDragEnd={handleDragEnd}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mt-6">
                        {categories.map((category, index) => (
                            <Droppable key={category} droppableId={String(index)}>
                                {(provided) => (
                                    <div
                                        className="bg-base-300 shadow-lg rounded-xl p-4 w-full min-h-[300px]"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <h2 className="text-xl font-semibold mx-6 mb-4">{category}</h2>
                                        <div className="space-y-3">
                                            {tasks
                                                .filter((task) => task.category === category)
                                                .map((task, taskIndex) => (
                                                    <Draggable key={task._id} draggableId={String(task._id)} index={taskIndex}>
                                                        {(provided) => (
                                                            <div
                                                                className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded-lg shadow hover:shadow-md transition"
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
                                                                <p className="text-sm text-gray-700 text-justify">{task.description}</p>
                                                                <div className="flex justify-between items-center mt-3">
                                                                    <button
                                                                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
                                                                        onClick={() => navigate(`/editTask/${task._id}`)}
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            deleteTask(task._id);
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </div>
                </DragDropContext>
            </main>

            <Footer />
        </div>
    );
};

export default TaskManagement;
