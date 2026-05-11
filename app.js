import express from "express";
import { PORT } from "./config/env.js";
import cookieParser from "cookie-parser";
import cors from  'cors';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import reservationRouter from './routes/reservation.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from "./middlewares/error.middleware.js";


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/reservations', reservationRouter);


app.get('/', (req, res) => {
    res.send('Welcome to Washawy!');
});

app.use(errorMiddleware);

app.listen(PORT, async () => {
    console.log(`Washawy is running on http://localhost:${PORT}`);

    await connectToDatabase();
});

export default app;