import express from 'express';
import chatController from '../controllers/chat.js';
import verifyToken from '../middleware/verify_token.js';
import cloudinary from '../config/cloudinary.js';
const router = express.Router();

router.post('/new', verifyToken, cloudinary.uploadChat.single('image'), chatController.newChat);
router.get('/rooms', verifyToken, chatController.getUserChatRoom);
router.get('/all/:receiver_id', verifyToken, chatController.getAllMessages);

export default router