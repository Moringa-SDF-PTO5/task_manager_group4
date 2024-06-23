import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTask } from '../api';  // Ensure fetchTask is implemented and exported in api.js
import Navbar from '../components/Navbar';

const TaskDetailPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const getTask = async () => {
      const task = await fetchTask(id);
      setTask(task);
    };
    getTask();
  }, [id]);

  if (!task) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Due Date: {task.dueDate}</p>
      {/* Add edit and delete functionality here */}
    </div>
  );
};

export default TaskDetailPage;

