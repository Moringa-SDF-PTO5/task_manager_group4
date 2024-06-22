import React, { useEffect, useState } from 'react';
import './styles/lists.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {error ? (
        <p>Error fetching users: {error}</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.username} - {user.email}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
