import React, { useState } from 'react';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';

const Users = () => {
  const [users, setUsers] = useState([]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  return (
    <div>
      <h1>Users</h1>
      <UserForm addUser={addUser} />
      <UserList users={users} />
    </div>
  );
};

export default Users;
