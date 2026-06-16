import express from 'express';
import { getProductById, getProducts } from '../controllers/productos/get.producto.controller.ts';
import { postBulk, postProducto } from '../controllers/productos/post.producto.controller.ts';
import updateProducto from '../controllers/productos/put.producto.controller.ts';
import deleteProducto from '../controllers/productos/delete.producto.controller.ts';
import { validateAccessToken } from '../middlewares/validateAccessToken.ts';
import { validateRol } from '../middlewares/validateRol.ts';

const router = express.Router();


router.get('/', getProducts);
router.post('/', validateAccessToken, validateRol(["ADMIN"]), postProducto);
router.post('/bulk', validateAccessToken, validateRol(["ADMIN"]), postBulk);
router.get('/:productoId', getProductById);
router.put('/:productoId', validateAccessToken, validateRol(["ADMIN"]), updateProducto);
router.delete('/:productoId', validateAccessToken, validateRol(["ADMIN"]), deleteProducto);

export default router;