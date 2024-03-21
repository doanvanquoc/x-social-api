import express from 'express';
import http from 'http'; // Import thư viện http để tạo server HTTP
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io'; // Import Server từ thư viện socket.io
// import userService from './services/user.js';
import userController from './controllers/user.js';
dotenv.config();
import admin from 'firebase-admin';
import serviceAccount from './config/firebase-admin.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

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
        userController.updateSocketId(data.userId, socket.id, data.fcmToken);
        console.log('login', data, socket.id, data.fcmToken);
    });
    socket.on('send_message', (data) => {
        console.log('sender socket id', data.sender.socketid);
        console.log('receiver socket id', data.receiver.socketid);
        io.to(data.sender.socketid).emit('sendMessage', data);
        io.to(data.receiver.socketid).emit('sendMessage', data);
    }
    );

    socket.on('like_post', (data) => {
        console.log('like_post', data);
       const message = {
            notification: {
                title: 'Notification',
                body: `${data.username} ${data.action} your post`
            },
            token: data.token
        }
        admin.messaging().send(message)
            .then((response) => {
                console.log('Successfully sent message:', response);
            })
            .catch((error) => {
                console.log('Error sending message:', error);
            });
    })
}
);

export default io

// Sử dụng server đã được tạo từ Express để lắng nghe
server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});
