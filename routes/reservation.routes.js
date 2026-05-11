import {Router} from 'express';
import authorize from '../middlewares/auth.middleware.js';
import {
    cancelReservation,
    createReservation,
    getReservations,
    getUserReservation,
    getReservationDetails, updateReservation
} from '../controllers/reservation.controllers.js';


const reservationRouter = Router();

reservationRouter.get('/',authorize, getReservations);

reservationRouter.get('/:id', authorize, getReservationDetails);

reservationRouter.post('/', authorize, createReservation);

reservationRouter.put('/:id', authorize, updateReservation);

reservationRouter.get('/user/:id', authorize, getUserReservation);

reservationRouter.put('/:id/cancel', authorize ,cancelReservation);


export default reservationRouter;



