import express from 'express';
import commentController from '../controllers/comment.js';
import verifyToken from '../middleware/verify_token.js';
const router = express.Router();

router.post('/', verifyToken, commentController.createComment);

export default router;