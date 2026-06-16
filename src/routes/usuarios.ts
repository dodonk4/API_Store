import express from 'express';
import { getAllUsuarios, getUsuarioById } from '../controllers/usuarios/get.usuario.controller.ts';
import postUsuario from '../controllers/usuarios/post.usuario.controller.ts';
import putUsuario from '../controllers/usuarios/put.usuario.controller.ts';
import deleteUsuario from '../controllers/usuarios/delete.usuario.controller.ts';
import { validateAccessToken } from '../middlewares/validateAccessToken.ts';
import { validateRol } from '../middlewares/validateRol.ts';

const router = express.Router();

router.get('/', validateAccessToken, validateRol(["ADMIN"]), getAllUsuarios);

router.post('/', validateAccessToken, validateRol(["ADMIN"]), postUsuario);

router.get('/:usuarioId', validateAccessToken, validateRol(["ADMIN"]), getUsuarioById);

router.put('/:usuarioId', validateAccessToken, validateRol(["ADMIN"]), putUsuario);

router.delete('/:usuarioId', validateAccessToken, validateRol(["ADMIN"]), deleteUsuario);

export default router;