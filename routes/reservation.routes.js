import {Router} from 'express';
import authorize from '../middlewares/auth.middleware.js';
import {
    cancelReservation,
    createReservation,
    getReservations,
    getUserReservation,
    getReservationDetails, updateReservation, updateReservationStatus
    } from '../controllers/reservation.controllers.js';
import authorizeManager from '../middlewares/Manager.middleware.js';
import { authorizeStaff } from '../middlewares/staff.middleware.js';


const reservationRouter = Router();

reservationRouter.get('/',authorize,authorizeStaff, getReservations);

reservationRouter.get('/:id', authorize, authorizeStaff, getReservationDetails);

reservationRouter.put('/:id/status',authorize, authorizeStaff, updateReservationStatus);

reservationRouter.post('/', authorize, createReservation);

reservationRouter.put('/:id', authorize,authorizeStaff,authorizeManager, updateReservation);

reservationRouter.put('/:id/cancel', authorize ,authorizeManager, cancelReservation);


export default reservationRouter;



