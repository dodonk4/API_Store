import express from 'express';
import { getProductById, getProducts } from '../controllers/productos/get.producto.controller.ts';
import { postProducto } from '../controllers/productos/post.producto.controller.ts';
import updateProducto from '../controllers/productos/put.producto.controller.ts';
import deleteProducto from '../controllers/productos/delete.producto.controller.ts';
import { validateAccessToken } from '../middlewares/validateAccessToken.middleware.ts';
import { validateRol } from '../middlewares/validateRol.middleware.ts';
import { validateSchema } from '../middlewares/validateSchema.middleware.ts';
import { productSchema, productSchemaUpdate } from '../schemas/productos.schema.ts';

const router = express.Router();


router.get('/', getProducts);
router.post('/', validateAccessToken, validateRol(["ADMIN"]), validateSchema(productSchema), postProducto);
router.get('/:productoId', getProductById);
router.put('/:productoId', validateAccessToken, validateRol(["ADMIN"]), validateSchema(productSchemaUpdate), updateProducto);
router.delete('/:productoId', validateAccessToken, validateRol(["ADMIN"]), deleteProducto);

export default router;