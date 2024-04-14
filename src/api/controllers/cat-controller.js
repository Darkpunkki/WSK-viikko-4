import {
  getCatsByUserId,
  getCatByIdWithOwner,
  addCat,
  listAllCats,
  modifyCat,
  removeCat,
} from '../models/cat-model.js';

const getCat = async (req, res) => {
  res.json(await listAllCats());
};

const getCatById = async (req, res) => {
  const cat = await getCatByIdWithOwner(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const getCatsByOwner = async (req, res) => {
  const userId = req.params.userId;
  try {
    const cats = await getCatsByUserId(userId);
    if (cats.length) {
      res.json(cats);
    } else {
      res.status(404).send('No cats found for this user');
    }
  } catch (error) {
    console.error('Error fetching cats by user ID:', error);
    res.status(500).send('Internal server error');
  }
};

const postCat = async (req, res) => {
  //console.log('postCat', req.body);
  //console.log('req.file', req.file);
  const {cat_name, weight, owner, birthdate} = req.body;
  const filename = req.file ? req.file.filename : null;
  const result = await addCat({cat_name, weight, owner, birthdate}, filename);

  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    console.log('Error adding cat.');
    res.sendStatus(400);
  }
};

const putCat = async (req, res) => {
  console.log('putCat', req.body);
  const catData = {
    cat_name: req.body.cat_name,
  };
  const result = await modifyCat(catData, req.params.id);
  if (result.message === 'success') {
    res.json({message: 'Cat item updated.'});
  } else {
    res.json({message: 'Cat item not found.'});
  }
};

const deleteCat = async (req, res) => {
  //res.sendStatus(200);
  const result = await removeCat(req.params.id);
  console.log('result', result, req.params.id);
  if (result.message === 'success') {
    res.json({message: 'Cat item deleted.'});
  } else {
    res.json({message: 'Cat item not found.'});
  }
};

export {getCat, getCatById, postCat, putCat, deleteCat, getCatsByOwner};
