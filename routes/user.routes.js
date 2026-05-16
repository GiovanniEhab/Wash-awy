import {Router} from 'express';
import {getUsers, getUser, createUser, updateUser, deleteUser} from '../controllers/user.controller.js';
import authorize from "../middlewares/auth.middleware.js";
import authorizeManager from '../middlewares/Manager.middleware.js';

const userRouter = Router();

userRouter.get('/', authorize,authorizeManager, getUsers);
userRouter.get('/:id',authorize, getUser);
userRouter.post('/', createUser);

userRouter.put('/:id', authorize, updateUser);

userRouter.delete('/:id', authorize, deleteUser);

export default userRouter;