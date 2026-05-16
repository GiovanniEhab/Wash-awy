import Reservation from "../models/reservation.model.js";

export const createReservation = async (req, res, next) => {

    try{
    const reservation = await Reservation.create({
        ... req.body,
        user: req.user._id,
    });
    res.status(201).json({success: true, data: reservation});

    }catch(error){
        next(error);
    }
}


export const getReservations = async (req, res, next) => {
    try{
        const reservations = await Reservation.find();
        res.status(200).json({success: true, data: reservations});
    }catch(error){
        next(error);
    }

}

export const getUserReservation = async (req, res, next) => {
    try{
        const reservation = await Reservation.find({user: req.user._id});
        if(!reservation  || reservation.length == 0){
            return res.status(404).json({success: false, message: 'No reservation found'});
        }
        res.status(200).json({success: true, data: reservation});
    }catch(error){
        next(error);
    }
}
/*
export const getUserReservation = async (req, res, next) => {
    try{
        //check if the user is the same as the one in the token
        if(req.user.id !== req.params._id){
            const error = new Error('You are not the owner if this account');
            error.status = 401;
            throw error;
        }
        const reservations = await Reservation.find({user: req.params.id});
        res.status(200).json({success: true, data: reservations});
    }catch(error){
        next(error);
    }
}
*/
export const cancelReservation = async (req, res, next) => {
    try{
        const reservation = await Reservation.findById(req.params.id);
        if(!reservation) return res.status(404).json({message: 'Reservation not found'});
        reservation.status = 'cancelled';
        await reservation.save({validateBeforeSave: false});
        res.status(200).json({success: true, data: reservation});
    }catch(error){
        next(error);
    }
}
/*
export const getReservation = async (req, res, next) => {
    try{
        const reservation = await Reservation.find();
        res.status(200).json({success: true, data: reservation});
    }catch(error){
        next(error);
    }
}
*/
export const getReservationDetails = async (req, res, next) => {
    try{
        const reservation = await Reservation.findById(req.params.id);
        if(!reservation) {
            const error = new Error('Reservation not found');
            error.status = 404;
            throw error;
        }

        res.status(200).json({success: true, data: reservation});
    }catch(error){
        next(error);
    }
}

export const updateReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            const error = new Error('Reservation not found');
            error.statusCode = 404;
            throw error;
        }

        if (reservation.user.toString() !== req.user._id.toString()) {
            const error = new Error('You are not authorized to update this reservation');
            error.statusCode = 403;
            throw error;
        }

        const updatedDoc = await Reservation.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Reservation Updated Successfully',
            data: updatedDoc
        });
    } catch (error) {
        next(error);
    }
}



export const updateReservationStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        

        const allowedStatuses = ['upcoming', 'completed', 'cancelled'];
        
        if (!allowedStatuses.includes(status)) {
            const error = new Error('Invalid status update');
            error.statusCode = 400;
            throw error;
        }

        const reservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!reservation) {
            const error = new Error('Reservation not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: `Status updated to ${status}`,
            data: reservation
        });
    } catch (error) {
        next(error);
    }
};