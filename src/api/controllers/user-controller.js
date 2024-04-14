import {
  addUser,
  findUserById,
  listAllUsers,
  modifyUser,
} from '../models/user-model.js';

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
  const {name, username, email, role, password} = req.body;
  const result = await addUser({name, username, email, role, password});
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

const deleteUser = (req, res) => {
  if (
    res.locals.user_id !== Number(req.params.id) &&
    res.locals.role !== 'admin'
  ) {
    res.sendStatus(403);
    return;
  }
  const result = removeUser(req.params.id);
  if (!result) {
    res.sendStatus(400);
    return;
  }
  res.json(result);
};

export {getUsers, getUserById, postUser, putUser, deleteUser};
