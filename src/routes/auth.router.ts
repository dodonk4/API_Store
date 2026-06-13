import express from 'express';
import { register } from '../controllers/auth/register.controller.ts';
import { login } from '../controllers/auth/login.controller.ts';
import { logout } from '../controllers/auth/logout.controller.ts';
import { generateAccessTokenForLoggedUser } from '../controllers/auth/generateAccessToken.controller.ts';
// import ValidationMiddleware from '../middlewares/validation.middleware.ts';
// import AuthController from '../controllers/auth.controller.ts';
// import AuthMiddleware from '../middlewares/auth.middleware.ts';

const router = express.Router();

router.post('/refresh', generateAccessTokenForLoggedUser);

router.post('/register', register); //Agregar middleware

router.post('/login', login);

router.post('/logout', logout);

export default router;