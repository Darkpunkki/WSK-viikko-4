// Note: db functions are async and must be called with await from the controller
// How to handle errors in controller?
import promisePool from '../../utils/database.js';

const listAllCats = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_cats');
  //console.log('rows', rows);
  return rows;
};

const findCatById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_cats WHERE cat_id = ?',
    [id]
  );
  //console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addCat = async ({cat_name, weight, owner, birthdate}, filename) => {
  const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate) VALUES (?, ?, ?, ?, ?)`;
  const params = [cat_name, weight, owner, filename, birthdate];
  console.log('params', params);
  const [rows] = await promisePool.execute(sql, params);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {cat_id: rows.insertId};
};

const modifyCat = async (cat, id) => {
  const sql = promisePool.format(`UPDATE wsk_cats SET ? WHERE cat_id = ?`, [
    cat,
    id,
  ]);
  const rows = await promisePool.execute(sql);
  //console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const removeCat = async (id) => {
  const [rows] = await promisePool.execute(
    'DELETE FROM wsk_cats WHERE cat_id = ?',
    [id]
  );
  //console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

// cat-model.js

const getCatByIdWithOwner = async (catId) => {
  const sql = `
    SELECT c.cat_name, c.weight, c.birthdate, u.name AS owner_name
    FROM wsk_cats c
    JOIN wsk_users u ON c.owner = u.user_id
    WHERE c.cat_id = ?;
  `;
  const [rows] = await promisePool.execute(sql, [catId]);
  return rows.length > 0 ? rows[0] : null;
};

const getCatsByUserId = async (userId) => {
  const sql = `
      SELECT * FROM wsk_cats WHERE owner = ?
  `;
  const [rows] = await promisePool.execute(sql, [userId]);
  return rows;
};

export {
  getCatsByUserId,
  getCatByIdWithOwner,
  addCat,
  findCatById,
  listAllCats,
  modifyCat,
  removeCat,
};
