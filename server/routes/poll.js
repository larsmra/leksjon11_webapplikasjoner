import express from 'express';
import { pollController } from '../controllers/index.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', isAuthenticated, pollController.get);
router.post('/', isAuthenticated, pollController.create);

export default router;
