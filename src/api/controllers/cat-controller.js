import {addCat, findCatById, listAllCats} from '../models/cat-model.js';

const getCat = (req, res) => {
  res.json(listAllCats());
};

const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = (req, res) => {
  console.log('postCat', req.body);
  console.log('req.file', req.file); // This is the file object from multer

  const result = addCat(req.body, req.file); // Now, req.body includes the filename
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    console.log('Error adding cat.');
    res.sendStatus(400);
  }
};

const putCat = (req, res) => {
  //res.sendStatus(200);
  res.json({message: 'Cat item updated.'});
};

const deleteCat = (req, res) => {
  //res.sendStatus(200);
  res.json({message: 'Cat item deleted.'});
};

export {getCat, getCatById, postCat, putCat, deleteCat};
