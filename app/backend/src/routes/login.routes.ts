import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import LoginMiddleware from '../middlewares/login.middleware';

const router = Router();

router.post('/login', LoginMiddleware, LoginController.login);
router.get('/login/validate', LoginController.loginValidate);

export default router;
