import express from 'express';
import { pollController } from '../controllers/index';

const router = express.Router();

router.get('/:id', pollController.get);
router.post('/', pollController.create);
router.put('/:id', pollController.update);

export default router;
