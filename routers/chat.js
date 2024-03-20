import express from 'express';
import chatController from '../controllers/chat.js';
import verifyToken from '../middleware/verify_token.js';
const router = express.Router();

router.post('/new', verifyToken, chatController.newChat);
router.get('/rooms', verifyToken, chatController.getUserChatRoom);
router.get('/all/:receiver_id', verifyToken, chatController.getAllMessages);

export default router