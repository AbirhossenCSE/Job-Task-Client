
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Modal from "react-modal";
import Navbar from "../Navbar";

Modal.setAppElement("#root");

const TaskManagement = () => {
    const [tasks, setTasks] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newTask, setNewTask] = useState({ title: "", description: "", category: "To-Do" });

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

    const addTask = async () => {
        if (!newTask.title.trim()) {
            alert("Title is required.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/tasks", {
                title: newTask.title,
                description: newTask.description,
                category: newTask.category,
                timestamp: new Date(),
            });

            setTasks([...tasks, { ...newTask, _id: response.data.insertedId }]);
            setModalIsOpen(false);
            setNewTask({ title: "", description: "", category: "To-Do" });
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:5000/tasks/${taskId}`);
            setTasks(tasks.filter((task) => task._id !== taskId));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div>
            <Navbar></Navbar>

            <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Task Management</h1>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                onClick={() => setModalIsOpen(true)}
            >
                Add Task
            </button>

            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="flex gap-4">
                    {categories.map((category, index) => (
                        <Droppable key={category} droppableId={String(index)}>
                            {(provided) => (
                                <div className="w-1/3 bg-gray-100 p-4 rounded shadow" ref={provided.innerRef} {...provided.droppableProps}>
                                    <h2 className="text-lg font-semibold mb-3">{category}</h2>
                                    {tasks
                                        .filter((task) => task.category === category)
                                        .map((task, taskIndex) => (
                                            <Draggable key={task._id} draggableId={task._id} index={taskIndex}>
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
                                                            className="text-red-500 mt-2"
                                                            onClick={() => deleteTask(task._id)}
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

            {/* Modal for Adding Task */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            >
                <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                    <h2 className="text-lg font-bold mb-4">Add New Task</h2>
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
                            onClick={() => setModalIsOpen(false)}
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
            </Modal>
        </div>
        </div>
    );
};

export default TaskManagement;
