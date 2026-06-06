import express from 'express';
import { getProductById, getProducts } from '../controllers/productos/get.producto.controller.ts';
import { postBulk, postProducto } from '../controllers/productos/post.producto.controller.ts';
import updateProducto from '../controllers/productos/put.producto.controller.ts';
import deleteProducto from '../controllers/productos/delete.producto.controller.ts';
import { validateAccessToken } from '../middlewares/validateAccessToken.ts';

const router = express.Router();


router.get('/', validateAccessToken, getProducts);
router.post('/', postProducto);
router.post('/bulk', postBulk);
router.get('/:productoId', getProductById);
router.put('/:productoId', updateProducto);
router.delete('/:productoId', deleteProducto);

export default router;