import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TaskManagement = () => {
    const [tasks, setTasks] = useState([]);
    const categories = ['To-Do', 'In Progress', 'Done'];

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
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
            await axios.put(`/tasks/${movedTask._id}`, { category: movedTask.category });
        } catch (error) {
            console.error('Error updating task category:', error);
        }
    };

    const addTask = async (title, description) => {
        try {
            const newTask = { title, description, category: 'To-Do', timestamp: new Date() };
            const response = await axios.post('/tasks', newTask);
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`/tasks/${taskId}`);
            setTasks(tasks.filter(task => task._id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className="task-container">
            <h1>Task Management</h1>
            <button onClick={() => addTask('New Task', 'Task description')}>Add Task</button>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="task-columns">
                    {categories.map((category, index) => (
                        <Droppable key={category} droppableId={String(index)}>
                            {(provided) => (
                                <div className="task-column" ref={provided.innerRef} {...provided.droppableProps}>
                                    <h2>{category}</h2>
                                    {tasks.filter(task => task.category === category).map((task, taskIndex) => (
                                        <Draggable key={task._id} draggableId={task._id} index={taskIndex}>
                                            {(provided) => (
                                                <div className="task-card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <h3>{task.title}</h3>
                                                    <p>{task.description}</p>
                                                    <button onClick={() => deleteTask(task._id)}>Delete</button>
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
    );
};

export default TaskManagement;
