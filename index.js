import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }))

import authRouter from './routers/auth.js';

app.use('/auth', authRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
