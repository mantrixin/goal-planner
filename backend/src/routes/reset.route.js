import {Router} from 'express';
import { resetData } from '../controllers/reset.controller.js';


const router = Router();

router.delete('/', resetData)

export default router;