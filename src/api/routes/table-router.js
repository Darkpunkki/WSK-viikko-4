import express from 'express';

import {
  getAllTables,
  getTableWithId,
  getTableLocationWithId,
  addNewTable,
  removeTableById,
  modifyExistingTable,
  getTablesByLocation,
} from '../controllers/table-controller.js';

const tableRouter = express.Router();

tableRouter.route('/').get(getAllTables).post(addNewTable);

tableRouter
  .route('/:id')
  .get(getTableWithId)
  .delete(removeTableById)
  .put(modifyExistingTable);

tableRouter.route('/:id/location').get(getTableLocationWithId);
tableRouter.route('/location/:location').get(getTablesByLocation);

export default tableRouter;
