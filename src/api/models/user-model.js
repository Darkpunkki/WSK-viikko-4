/*const userItems = [
  {
    user_id: 3600,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 3601,
    name: 'Jane Doe',
    username: 'janedoe',
    email: 'jane@metropolia.fi',
    role: 'admin',
    password: 'password1',
  },
  {
    user_id: 3602,
    name: 'Jack Doe',
    username: 'jackdoe',
    email: 'jack@metropolia.fi',
    role: 'user',
    password: 'password2',
  },
];
*/
import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_users');
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE user_id = ?',
    [id]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addUser = async (user) => {
  const {name, username, email, role, password} = user;
  const sql = `INSERT INTO wsk_users (name, username, email, role, password) VALUES (?, ?, ?, ?, ?)`;
  const params = [name, username, email, role, password];
  const [rows] = await promisePool.execute(sql, params);
  console.log('params', params);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {user_id: rows.insertId};
};

const modifyUser = async (user, id) => {
  const sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ?`, [
    user,
    id,
  ]);
  const rows = await promisePool.execute(sql);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const removeUser = async (id) => {
  const [rows] = await promisePool.execute(
    'DELETE FROM wsk_users WHERE user_id = ?',
    [id]
  );
  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const getUserByUsername = async (username) => {
  const sql = 'SELECT * FROM wsk_users WHERE username = ?';
  const [users] = await promisePool.execute(sql, [username]);
  return users.length ? users[0] : null;
};

export {
  listAllUsers,
  findUserById,
  addUser,
  modifyUser,
  removeUser,
  getUserByUsername,
};
