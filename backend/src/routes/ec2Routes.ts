import { Router } from 'express';
import { listInstances } from '../controllers/ec2Controller';

const router = Router();

router.get('/instances', listInstances);

export default router;