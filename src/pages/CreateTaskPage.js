import React, { useState, useEffect } from 'react';
import './CreateTaskPage.css';

const CreateTaskPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    user_id: null,  // Initialize user_id as null
  });

  const [error, setError] = useState(null); // State to hold error message

  useEffect(() => {
    // Fetch user_id from backend upon component mount
    fetchUserId();
  }, []);

  const fetchUserId = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/current_user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // Include credentials to send cookies (session)
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user information');
      }

      const data = await response.json();
      setFormData({ ...formData, user_id: data.user_id });
    } catch (error) {
      console.error('Error fetching user_id:', error);
      // Handle error
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',  // Include credentials to send cookies (session)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Task creation failed');
      }

      const data = await response.json();
      console.log('Task created successfully:', data);
      // Handle successful task creation, e.g., redirect or clear form
    } catch (error) {
      console.error('Error creating task:', error);
      setError(error.message);
    }
  };

  return (
    <div className="create-task-container">
      <h2>Create Task</h2>
      {error && <div className="error-message">{error}</div>} {/* Display error message */}
      <form onSubmit={handleSubmit} className="create-task-form">
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input type="date" name="due_date" value={formData.due_date} onChange={handleChange} required />
        </div>
        <button type="submit" className="create-task-button">Create Task</button>
      </form>
    </div>
  );
};

export default CreateTaskPage;
