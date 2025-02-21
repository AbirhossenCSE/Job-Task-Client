import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({
        title: "",
        description: "",
    });

    useEffect(() => {
        fetchTask();
    }, []);

    const fetchTask = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/tasks/${id}`);
            setTask(response.data);
        } catch (error) {
            console.error("Error fetching task:", error);
        }
    };

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/tasks/${id}`, task, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            navigate("/tasks");
        } catch (error) {
            console.error("Error updating task:", error.response?.data || error.message);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    className="border p-2 w-full mb-4"
                />
                <textarea
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    className="border p-2 w-full mb-4"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Update Task
                </button>
            </form>
        </div>
    );
};

export default EditTask;
