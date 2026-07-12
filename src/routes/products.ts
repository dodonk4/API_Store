import express from 'express';
import { getProductById, getProducts } from '../controllers/products/get.product.controller.ts';
import { postProduct } from '../controllers/products/post.product.controller.ts';
import updateProduct from '../controllers/products/put.product.controller.ts';
import deleteProduct from '../controllers/products/delete.product.controller.ts';
import { validateAccessToken } from '../middlewares/validateAccessToken.middleware.ts';
import { validateRol } from '../middlewares/validateRol.middleware.ts';
import { validateSchema } from '../middlewares/validateSchema.middleware.ts';
import { productSchema, productSchemaUpdate } from '../schemas/products.schema.ts';

const router = express.Router();


router.get('/', getProducts);
router.post('/', validateAccessToken, validateRol(["ADMIN"]), validateSchema(productSchema), postProduct);
router.get('/:productId', getProductById);
router.put('/:productId', validateAccessToken, validateRol(["ADMIN"]), validateSchema(productSchemaUpdate), updateProduct);
router.delete('/:productId', validateAccessToken, validateRol(["ADMIN"]), deleteProduct);

export default router;