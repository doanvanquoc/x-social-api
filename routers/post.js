import express from 'express'
import postController from '../controllers/post.js'
import verifyToken from '../middleware/verify_token.js'
const router = express.Router()
import cloud from '../config/cloudinary.js'

router.get('/', verifyToken, postController.getAllPosts)
router.get('/user', verifyToken, postController.getUserPosts)
router.get('/:id', verifyToken, postController.getPostById)
router.post('/', verifyToken, cloud.uploadPost.any('images'), postController.createPost)
export default router
