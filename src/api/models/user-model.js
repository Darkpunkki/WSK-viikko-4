const userItems = [
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

const listAllUsers = () => {
  return userItems;
};

const findUserById = (id) => {
  return userItems.find((item) => item.user_id == id);
};

const addUser = (user) => {
  const {name, username, email, role, password} = user;
  const newId = userItems[userItems.length - 1].user_id + 1;

  userItems.unshift({
    user_id: newId,
    name,
    username,
    email,
    role,
    password,
  });

  return {user_id: newId};
};

export {listAllUsers, findUserById, addUser};
