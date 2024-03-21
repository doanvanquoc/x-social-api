import express from 'express';
import http from 'http'; // Import thư viện http để tạo server HTTP
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io'; // Import Server từ thư viện socket.io
// import userService from './services/user.js';
import userController from './controllers/user.js';
dotenv.config();

const app = express();
const server = http.createServer(app); // Tạo server HTTP từ ứng dụng Express
const io = new Server(server); // Tạo đối tượng Socket.IO từ server HTTP

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

import authRouter from './routers/auth.js';
import userRouter from './routers/user.js';
import postRouter from './routers/post.js';
import commentRouter from './routers/comment.js';
import chatRouter from './routers/chat.js';

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);
app.use('/chat', chatRouter);


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('login', (data) => {
        userController.updateSocketId(data.id, socket.id);
        console.log('login', data.id, socket.id);
    });
    socket.on('send_message', (data) => {
        io.emit('sendMessage', data);
    }
    );
}
);

export default io

// Sử dụng server đã được tạo từ Express để lắng nghe
server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});
