import express from 'express';
const router = express.Router();
import authController from '../controllers/auth.js';

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/check-before-register', authController.checkBeforeRegister);

export default router;