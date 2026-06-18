import express from 'express';
import { register } from '../controllers/auth/register.controller.ts';
import { login } from '../controllers/auth/login.controller.ts';
import { logout } from '../controllers/auth/logout.controller.ts';
import { generateAccessTokenForLoggedUser } from '../controllers/auth/generateAccessToken.controller.ts';
import { validateAccessToken } from '../middlewares/validateAccessToken.middleware.ts';
import { validateSchema } from '../middlewares/validateSchema.middleware.ts';
import { loginSchema } from '../schemas/auth.schema.ts';
// import ValidationMiddleware from '../middlewares/validation.middleware.ts';
// import AuthController from '../controllers/auth.controller.ts';
// import AuthMiddleware from '../middlewares/auth.middleware.ts';

const router = express.Router();

router.post('/refresh', generateAccessTokenForLoggedUser);

router.post('/register', register); //Agregar middleware

router.post('/login', validateSchema(loginSchema), login);

router.post('/logout', validateAccessToken, logout);

export default router;