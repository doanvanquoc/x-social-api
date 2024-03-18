import express from 'express'
import postController from '../controllers/post.js'
import verifyToken from '../middleware/verify_token.js'
const router = express.Router()

router.get('/', verifyToken, postController.getAllPosts)
router.get('/:id', verifyToken, postController.getPostById)

export default router
