import { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const TaskManagement = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const categories = ["To-Do", "In Progress", "Done"];

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:5000/tasks");
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
            await axios.put(`http://localhost:5000/tasks/${movedTask._id}`, {
                category: movedTask.category,
            });
        } catch (error) {
            console.error("Error updating task category:", error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:5000/tasks/${taskId}`);
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Task Management</h1>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded mb-4"
                    onClick={() => navigate("/addTask")}
                >
                    Add New Task
                </button>

                <DragDropContext onDragEnd={handleDragEnd}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {categories.map((category, index) => (
                            <Droppable key={category} droppableId={String(index)}>
                                {(provided) => (
                                    <div
                                        className="w-full bg-gray-100 p-4 rounded shadow"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <h2 className="text-lg font-semibold mb-3">{category}</h2>
                                        {tasks
                                            .filter((task) => task.category === category)
                                            .map((task, taskIndex) => (
                                                <Draggable key={task._id} draggableId={String(task._id)} index={taskIndex}>
                                                    {(provided) => (
                                                        <div
                                                            className="bg-white p-3 mb-2 rounded shadow"
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <h3 className="font-medium">{task.title}</h3>
                                                            <p className="text-sm">{task.description}</p>
                                                            <button
                                                                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                                                onClick={() => navigate(`/editTask/${task._id}`)}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                className="bg-red-500 text-white px-2 py-1 rounded"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    deleteTask(task._id);
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </div>
                </DragDropContext>
            </div>
        </div>
    );
};

export default TaskManagement;

