import express from 'express'
import groupController from '../controllers/group.js'
import verifyToken from '../middleware/verify_token.js'
const router = express.Router()

router.get('/', verifyToken ,groupController.getAllGroups)

export default router