import {Router} from 'express';

import {signin, signup, signout} from '../controllers/auth.controllers.js';

const authRouter = Router();

authRouter.post('/sign-up', signup);
//authRouter.post('/sign-up', (req, res) => res.send({title: 'sign up'}));

authRouter.post('/sign-in', signin);
//authRouter.post('/sign-in', (req, res) => res.send({title: 'sign in'}));

authRouter.post('/sign-out', signout);
//authRouter.post('/sign-out', (req, res) => res.send({title: 'sign out'}));

export default authRouter;



