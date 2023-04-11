const express = require('express');
const app = express();
const env = require('dotenv').config();
const cors = require('cors');
const pool = require('./db');

const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Create users table if it does not exist
pool.query(
  'CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(50), surname VARCHAR(50))',
  (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Table "users" has been successfully created');
    }
  }
);

// Routes

// POST
app.post('/users', async (req, res) => {
  try {
    console.log('I am logging amigo!');
    const { name } = req.body;
    const { surname } = req.body;
    const newUser = await pool.query(
      'INSERT INTO users (name, surname) VALUES ($1, $2) RETURNING *',
      [name, surname]
    );
    res.json(newUser.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// GET all
app.get('/users', async (req, res) => {
  try {
    console.log('I am logging amigo!');
    const users = await pool.query('SELECT * FROM users');
    res.json(users.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// GET by ID
app.get('/users/:id', async (req, res) => {
  try {
    console.log('I am logging amigo!');
    const { id } = req.params;
    const user = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
    res.json(user.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// PUT
app.put('/users/:id', async (req, res) => {
  try {
    console.log('I am logging amigo!');
    const { id } = req.params;
    const { name } = req.body;
    const { surname } = req.body;
    const updatedUser = await pool.query(
      'UPDATE users SET name = $1 , surname = $2 WHERE id = $3',
      [name, surname, id]
    );
    res.send('User was updated!');
  } catch (error) {
    console.log(error.message);
  }
});

// Delete
app.delete('/users/:id', async (req, res) => {
  try {
    console.log('I am logging amigo!');
    const { id } = req.params;
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.send(`User deleted`);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`The server has started on port: ${port}`);
  console.log('I am logging amigo!');
});
