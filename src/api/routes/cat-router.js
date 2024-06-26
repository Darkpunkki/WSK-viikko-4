import express from 'express';
import {
  getCatsByOwner,
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

import multer from 'multer';
import {createThumbnail} from '../../middlewares.js';

const catRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const originalname = file.originalname.split('.')[0].toLowerCase();
    const prefix = `${originalname}-${file.fieldname}`;
    let extension = 'jpg';
    if (file.mimetype === 'image/png') {
      extension = 'png';
    }
    console.log('file', file);
    const filename = `${prefix}-${uniqueSuffix}.${extension}`;
    cb(null, filename);
  },
});

const upload = multer({
  dest: 'uploads/',
  storage,
});

catRouter
  .route('/')
  .get(getCat)
  .post(upload.single('file'), createThumbnail, postCat);
catRouter.get('/by-owner/:userId', getCatsByOwner);
catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);

export default catRouter;
