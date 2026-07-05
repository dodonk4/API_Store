import express from 'express';
import { register } from '../controllers/auth/register.controller.ts';
import { logout } from '../controllers/auth/logout.controller.ts';
import { generateAccessTokenForLoggedUser } from '../controllers/auth/generateAccessToken.controller.ts';
import { validateAccessToken } from '../middlewares/validateAccessToken.middleware.ts';
import { validateSchema } from '../middlewares/validateSchema.middleware.ts';
import { loginSchema, registerSchema } from '../schemas/auth.schema.ts';
import { login } from '../controllers/auth/login.controller.ts';
import { validateRefreshToken } from '../middlewares/validateRefreshToken.middleware.ts';


const router = express.Router();

router.post('/refresh', validateRefreshToken, generateAccessTokenForLoggedUser);

router.post('/register', validateSchema(registerSchema), register);

router.post('/login', validateSchema(loginSchema), login);

router.post('/logout', validateRefreshToken, logout);

export default router;