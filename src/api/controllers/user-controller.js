import {
  addUser,
  findUserById,
  listAllUsers,
  modifyUser,
  removeUser,
} from '../models/user-model.js';
import bcrypt from 'bcrypt';

const getUsers = async (req, res) => {
  res.json(await listAllUsers());
};

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res) => {
  const {name, username, email, role} = req.body;
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const result = await addUser({
    name,
    username,
    email,
    role,
    password: hashedPassword,
  });
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    console.log('Error adding user.');
    res.sendStatus(400);
  }
};

const putUser = async (req, res) => {
  if (
    res.locals.user_id !== Number(req.params.id) &&
    res.locals.role !== 'admin'
  ) {
    res.sendStatus(403);
    return;
  }
  const result = await modifyUser(req.body, req.params.id);
  if (!result) {
    res.status(400);
    return;
  }
  res.json(result);
};

const deleteUser = async (req, res) => {
  console.log(
    `Logged-in user ID: ${res.locals.user_id}, Role: ${res.locals.role}`
  );
  console.log(`Attempting to delete user ID: ${req.params.id}`);
  try {
    const result = await removeUser(req.params.id);
    if (!result) {
      res.sendStatus(400);
      return;
    }
    res.json(result);
  } catch (error) {
    console.error('Error deleting user:', error);
    res.sendStatus(500);
  }
};

export {getUsers, getUserById, postUser, putUser, deleteUser};
