import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({

    name:{
        type:String,
    required: [true, 'Reservation type is required'],
    trim: true,
    minLength: 2,
    maxLength: 50,
    },
    price:{
        type:Number,
        required: [true, 'Reservation price is required'],
        min:[0, 'Reservation must be greater than 0'],
    },
    currency:{
        type:String,
        enum:['EGP','USD'],
        default: 'EGP',
    },

    paymentMethod:{
        type: String,
        required: [true, 'Payment methods are required'],
        trim: true,
    },
    status:{
        type: String,
        enum:['upcoming', 'completed', 'cancelled'],
        default: 'upcoming',
    },
        startDate: {
            type: Date, //Year-Month-Day e.g. 2026-07-05
            required: [true, 'Reservation start date is required'],
            validate: {
                validator: function(value) {
                    return value >= new Date().setHours(0, 0, 0, 0);
                },
                message: 'Reservation date cannot be in the past',}
        },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index:true,
    }

},{timestamps:true});
/*
//Auto-Calculate the renewal date if missing.
reservationSchema.pre('save', function (next) {
    if(!this.renewalDate){
        const renewalperiods={
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };
        this.renewalDate= new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalperiods[this.frequency]);
    }

    //Auto-Update the status if the renewal date has passed.
    if(this.renewalDate < new Date()){
        this.status= 'Expired';
    }
    next();
});

 */

const Reservation = mongoose.model('reservation', reservationSchema);

export default Reservation;