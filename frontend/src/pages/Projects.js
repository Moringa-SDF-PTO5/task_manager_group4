import React, { useState } from 'react';
import ProjectForm from '../components/ProjectForm';
import ProjectList from '../components/ProjectList';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const addProject = (project) => {
    setProjects([...projects, project]);
  };

  return (
    <div>
      <h1>Projects</h1>
      <ProjectForm addProject={addProject} />
      <ProjectList projects={projects} />
    </div>
  );
};

export default Projects;
