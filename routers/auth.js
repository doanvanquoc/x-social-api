import express from 'express';
const router = express.Router();
import authController from '../controllers/auth.js';
import cloud from '../config/cloudinary.js';
import verifyToken from '../middleware/verify_token.js';

router.post('/login', authController.login);
router.post('/register',cloud.uploadAvatar.single('avatar'), authController.register);
router.post('/check-before-register', authController.checkBeforeRegister);
router.get('/verify', verifyToken, (req, res) => {
  const data = req.user
    res.status(200).json({ success: true, message: 'Token is valid', data})
});

export default router;