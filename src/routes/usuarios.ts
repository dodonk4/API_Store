import express from 'express';
import { getAllUsuarios, getUsuarioById } from '../controllers/usuarios/get.usuario.controller.ts';
import postUsuario from '../controllers/usuarios/post.usuario.controller.ts';
import putUsuario from '../controllers/usuarios/put.usuario.controller.ts';
import deleteUsuario from '../controllers/usuarios/delete.usuario.controller.ts';

const router = express.Router();

router.get('/', getAllUsuarios);

router.post('/', postUsuario);

router.get('/:usuarioId', getUsuarioById);

router.put('/:usuarioId', putUsuario);

router.delete('/:usuarioId', deleteUsuario);

export default router;