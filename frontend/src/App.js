import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const apiUrl = process.env.REACT_APP_API_URL;

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get(`${apiUrl}/users`);
    setUsers(response.data);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const handleAddUser = async () => {
    await axios.post(`${apiUrl}/users`, { name, surname });
    fetchUsers();
    setName('');
    setSurname('');
  };

  const handleUpdateUser = async (user) => {
    const newName = prompt(`Enter new name for ${user.name}:`);
    const newSurname = prompt(`Enter new surname for ${user.name}:`);
    await axios.put(`${apiUrl}/users/${user.id}`, { name: newName, surname: newSurname });
    fetchUsers();
  };
  

  const handleDeleteUser = async (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      await axios.delete(`${apiUrl}/users/${user.id}`);
      fetchUsers();
    }
  };

  return (
    <div className="App">
      <h1>Users</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>
                <button onClick={() => handleUpdateUser(user)}>Update</button>
                <button onClick={() => handleDeleteUser(user)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input type="text" value={name} onChange={handleNameChange} />
            </td>
            <td>
              <input type="text" value={surname} onChange={handleSurnameChange} />
            </td>
            <td>
              <button onClick={handleAddUser}>Add</button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default App;
