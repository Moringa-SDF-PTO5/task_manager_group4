import React, { useState } from 'react';

const TaskForm = ({ onSubmit }) => {
  const [task, setTask] = useState('');

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ task });
    setTask(''); // Clear input after submission (if needed)
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={handleChange}
        placeholder="Enter task description"
        required
      />
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
