import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import LoginMiddleware from '../middlewares/login.middleware';
import validateJwt from '../middlewares/validate.jwt.util';

const router = Router();

router.post('/login', LoginMiddleware, LoginController.login);
router.get('/login/validate', validateJwt, LoginController.loginValidate);

export default router;
