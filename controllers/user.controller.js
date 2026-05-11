import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import{JWT_SECRET, JWT_EXPIRES_IN} from "../config/env.js";

export const createUser = async (req, res, next) => {
    try{
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) {
            const error = new Error('User already exist');
            error.status = 409;
            throw error;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({name,email,password: hashedPassword});

        const token = jwt.sign({userId: newUser._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});


        res.status(201).json({success: true, message: 'User successfully created',
        data:{token, user:newUser}});
    }catch(error){
        next(error);
    }
}

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({success: true, data: users});
    } catch (error) {
        next(error);
    }
}


export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            const error = new Error('User not found!');
            error.statusCode = 404;
            throw error;

        }
        res.status(200).json({success: true, data: user});
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    try{
        if(req.user._id.toString() !== req.user._id) {
            const error = new Error('You are not authorized to update this profile');
            error.status = 403;
            throw error;
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body,{new: true, runValidators:true}).select(-'password');
    res.status(200).json({success: true, data: updatedUser});
    }catch(error){
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    try{
        if(req.user._id.toString() !== req.user._id) {
            const error = new Error('You are not authorized to delete this profile');
            error.status = 403;
            throw error;
        }
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({success:true, message: 'User successfully deleted'});
    }catch(error){
        next(error);
    }
}