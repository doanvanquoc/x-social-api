import express from 'express'
import groupController from '../controllers/group.js'
import verifyToken from '../middleware/verify_token.js'
import cloud from '../config/cloudinary.js'
const router = express.Router()

router.get('/', verifyToken ,groupController.getAllGroups)
router.post('/join', verifyToken, groupController.joinGroup)
router.get('/:groupId', verifyToken, groupController.getGroupById)
router.post('/', verifyToken, cloud.uploadGroup.single('poster'), groupController.createGroup)

export default router