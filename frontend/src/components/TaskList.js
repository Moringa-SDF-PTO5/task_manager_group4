import React, { useEffect, useState } from 'react';

const TaskList = ({ tasks }) => {
  const [taskList, setTaskList] = useState(tasks);

  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then(response => response.json())
      .then(data => setTaskList(data));
  }, []);

  return (
    <ul>
      {taskList.map(task => (
        <li key={task.id}>{task.title} - {task.description}</li>
      ))}
    </ul>
  );
};

export default TaskList;
