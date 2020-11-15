import express from 'express';
import { userController } from '../controllers/index.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.post('/', userController.create);

export default router;
