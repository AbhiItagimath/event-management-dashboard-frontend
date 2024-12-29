import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskTracker() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ name: '', deadline: '', status: 'Pending', eventId: '' });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleInputChange = (e) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

    const handleAddTask = async () => {
        try {
            await axios.post('http://localhost:8080/api/tasks', newTask);
            fetchTasks();
            setNewTask({ name: '', deadline: '', status: 'Pending', eventId: '' });
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleUpdateTask = async (id, status) => {
        try {
            await axios.put(`http://localhost:8080/api/tasks/${id}`, { status });
            fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <div className="container">
            <h2>Task Tracker</h2>
            <div className="mb-3">
                <input type="text" name="name" value={newTask.name} onChange={handleInputChange} placeholder="Task Name" className="form-control" />
                <input type="date" name="deadline" value={newTask.deadline} onChange={handleInputChange} className="form-control" />
                <input type="text" name="eventId" value={newTask.eventId} onChange={handleInputChange} placeholder="Event ID" className="form-control" />
                <button onClick={handleAddTask} className="btn btn-primary mt-2">Add Task</button>
            </div>
            <ul className="list-group">
                {tasks.map(task => (
                    <li key={task.id} className="list-group-item">
                        <h5>{task.name}</h5>
                        <p>{task.deadline}</p>
                        <p>{task.status}</p>
                        <button onClick={() => handleUpdateTask(task.id, 'Completed')} className="btn btn-success">Mark as Completed</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskTracker;
