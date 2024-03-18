import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }))

import authRouter from './routers/auth.js';
import userRouter from './routers/user.js';
import postRouter from './routers/post.js';

app.use('/auth', authRouter);
// app.use('/user', userRouter);
app.use('/posts', postRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
