import express from 'express';
import { pollExecutionController } from '../controllers/index.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// router.get('/:id', isAuthenticated, pollExecutionController.list);
router.post('/', isAuthenticated, pollExecutionController.create);

export default router;
