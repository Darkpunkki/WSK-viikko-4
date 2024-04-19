import express from 'express';
import catRouter from './routes/cat-router.js';
import userRouter from './routes/user-router.js';
import tableRouter from './routes/table-router.js';
import dotenv from 'dotenv';

const router = express.Router();
router.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

router.use('/cats', catRouter);
router.use('/users', userRouter);
router.use('/tables', tableRouter);

export default router;
