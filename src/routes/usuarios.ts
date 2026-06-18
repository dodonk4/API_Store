import express from 'express';
import { getAllUsuarios, getUsuarioById } from '../controllers/usuarios/get.usuario.controller.ts';
import postUsuario from '../controllers/usuarios/post.usuario.controller.ts';
import putUsuario from '../controllers/usuarios/put.usuario.controller.ts';
import deleteUsuario from '../controllers/usuarios/delete.usuario.controller.ts';
import { validateAccessToken } from '../middlewares/validateAccessToken.middleware.ts';
import { validateRol } from '../middlewares/validateRol.middleware.ts';
import { validateSchema } from '../middlewares/validateSchema.middleware.ts';
import { createUserSchema, updateUserSchema } from '../schemas/auth.schema.ts';

const router = express.Router();

router.get('/', validateAccessToken, validateRol(["ADMIN"]), getAllUsuarios);

router.post('/', validateAccessToken, validateRol(["ADMIN"]), validateSchema(createUserSchema), postUsuario);

router.get('/:usuarioId', validateAccessToken, validateRol(["ADMIN"]), getUsuarioById);

router.put('/:usuarioId', validateAccessToken, validateRol(["ADMIN"]), validateSchema(updateUserSchema), putUsuario);

router.delete('/:usuarioId', validateAccessToken, validateRol(["ADMIN"]), deleteUsuario);

export default router;