import express from 'express';
import { getAllUsers, getUserById } from '../controllers/users/get.user.controller.ts';
import postUser from '../controllers/users/post.user.controller.ts';
import putUser from '../controllers/users/put.user.controller.ts';
import deleteUser from '../controllers/users/delete.user.controller.ts';
import { validateAccessToken } from '../middlewares/validateAccessToken.middleware.ts';
import { validateRol } from '../middlewares/validateRol.middleware.ts';
import { validateSchema } from '../middlewares/validateSchema.middleware.ts';
import { createUserSchema, updateUserSchema } from '../schemas/auth.schema.ts';

const router = express.Router();

router.get('/', validateAccessToken, validateRol(["ADMIN"]), getAllUsers);

router.post('/', validateAccessToken, validateRol(["ADMIN"]), validateSchema(createUserSchema), postUser);

router.get('/:userId', validateAccessToken, validateRol(["ADMIN"]), getUserById);

router.put('/:userId', validateAccessToken, validateRol(["ADMIN"]), validateSchema(updateUserSchema), putUser);

router.delete('/:userId', validateAccessToken, validateRol(["ADMIN"]), deleteUser);

export default router;