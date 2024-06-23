// CreateTaskPage.js
import React from 'react';
import TaskForm from '../components/TaskForm';
import { createTask } from '../api';
import './CreateTaskPage.css';

const CreateTaskPage = () => {
    const handleSubmit = async (task) => {
        try {
            await createTask(task);
            console.log('Task created successfully');
            // Optionally redirect to task list or show success message
        } catch (error) {
            console.error('Error creating task:', error);
            // Handle error as needed
        }
    };

    return (
        <div className="create-task-wrapper">
            <div className="create-task-container">
                <h2>Create Task</h2>
                <TaskForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default CreateTaskPage;
