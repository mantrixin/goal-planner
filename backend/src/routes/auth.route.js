import { Router } from 'express';
import { register, login} from '../controllers/auth.Controller.js';
import { protect } from '../middleware/auth.js';

const r = Router();

r.post('/register', register);
r.post('/login', login);


export default r;
