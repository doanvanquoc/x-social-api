import express from 'express';
const router = express.Router();
import authController from '../controllers/auth.js';
import cloud from '../config/cloudinary.js';

router.post('/login', authController.login);
router.post('/register',cloud.uploadAvatar.single('avatar'), authController.register);
router.post('/check-before-register', authController.checkBeforeRegister);

export default router;