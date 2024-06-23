
const API_URL = 'http://127.0.0.1:5000';  // Make sure this URL is correct

// Task API calls
export const fetchTasks = async () => {
  const response = await fetch(`${API_URL}/tasks`);
  return response.json();
};

export const createTask = async (task) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  return response.json();
};

export const fetchTask = async (id) => {
  const response = await fetch(`${API_URL}/tasks/${id}`);
  return response.json();
};

// User API calls
export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  return response.json();
};

export const createUser = async (user) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const fetchUser = async (id) => {
  const response = await fetch(`${API_URL}/users/${id}`);
  return response.json();
};

// Project API calls
export const fetchProjects = async () => {
  const response = await fetch(`${API_URL}/projects`);
  return response.json();
};

export const createProject = async (project) => {
  const response = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });
  return response.json();
};

export const fetchProject = async (id) => {
  const response = await fetch(`${API_URL}/projects/${id}`);
  return response.json();
};


export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    // Assuming your backend returns a token upon successful login
    return data.token; // Adjust this based on your backend response
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async (formData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Registration failed.');
  }

  return response.json();
};