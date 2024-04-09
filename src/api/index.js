import express from 'express';
import catRouter from './routes/cat-router.js';
import userRouter from './routes/user-router.js';

const router = express.Router();
router.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});
// bind base url for all cat routes to catRouter
router.use('/cats', catRouter);
router.use('/user', userRouter);

export default router;
