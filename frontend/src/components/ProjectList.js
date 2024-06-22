import React, { useEffect, useState } from 'react';
import './styles/lists.css';

const ProjectList = ({ projects }) => {
  const [projectList, setProjectList] = useState(projects);

  useEffect(() => {
    fetch('http://localhost:5000/projects')
      .then(response => response.json())
      .then(data => setProjectList(data));
  }, []);

  return (
    <ul>
      {projectList.map(project => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  );
};

export default ProjectList;
