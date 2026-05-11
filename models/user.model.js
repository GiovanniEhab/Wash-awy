import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'User name is required'],
        trim: true,
        minlength: 5,
        maxlength: 25,
    },
    email:{
        type: String,
        required:[true, 'Email is required'],
        unique:true,
        trim:true,
        match:[/\S+@\S+\.\S+/, 'Please enter a valid email'],//Giovanni.Ehab123@gmail.com
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
        minlength: 5,
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
