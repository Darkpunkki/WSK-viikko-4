import express from 'express';
import {
  getAllReservations,
  addReservation,
  updateReservation,
  deleteReservation,
  getReservationsByTableAndDate,
} from '../controllers/reservation-controller.js';

const reservationRouter = express.Router();

reservationRouter.get('/:tableId', getReservationsByTableAndDate);
reservationRouter.get('/', getAllReservations);
reservationRouter.post('/', addReservation);
reservationRouter.put('/:id', updateReservation);
reservationRouter.delete('/:id', deleteReservation);

export default reservationRouter;
