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


/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products.
 *     description: Returns a list of all registered products.
 *     tags:
 *       - Products
 *
 *     responses:
 *       200:
 *         description: Products retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', getProducts);
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product.
 *     description: Creates a new product in the store.
 *     tags:
 *       - Products
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductRequest'
 *
 *     responses:
 *       201:
 *         description: Product created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *
 *       400:
 *          $ref: '#/components/responses/BadRequest'   
 *
 *       401:
 *          $ref: '#/components/responses/Unauthorized'  
 *
 *       403:
 *          $ref: '#/components/responses/Forbidden' 
 * 
 *       409:
 *          $ref: '#/components/responses/Conflict'  
 *
 *       500:
 *          $ref: '#/components/responses/InternalServerError'  
 */
router.post('/', validateAccessToken, validateRol(["ADMIN"]), validateSchema(productSchema), postProduct);
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID.
 *     description: Returns the product associated with the specified ID.
 *     tags:
 *       - Products
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID.
 *         schema:
 *           type: integer
 *           example: 1
 *
 *     responses:
 *       200:
 *         description: Product retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *
 *       400:
 *          $ref: '#/components/responses/BadRequest'   
 *       404:
 *          $ref: '#/components/responses/NotFound'  
 *       500:
 *          $ref: '#/components/responses/InternalServerError'  
 */
router.get('/:productId', getProductById);
/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product.
 *     description: Updates the information of an existing product.
 *     tags:
 *       - Products
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID.
 *         schema:
 *           type: integer
 *           example: 1
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProductRequest'
 *
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *
 *       400:
 *          $ref: '#/components/responses/BadRequest'   
 *
 *       401:
 *          $ref: '#/components/responses/Unauthorized'  
 *
 *       403:
 *          $ref: '#/components/responses/Forbidden'  
 *
 *       404:
 *          $ref: '#/components/responses/NotFound'  
 *
 *       409:
 *          $ref: '#/components/responses/Conflict'  
 *
 *       500:
 *          $ref: '#/components/responses/InternalServerError'  
 */
router.put('/:productId', validateAccessToken, validateRol(["ADMIN"]), validateSchema(productSchemaUpdate), updateProduct);
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product.
 *     description: Deletes an existing product.
 *     tags:
 *       - Products
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID.
 *         schema:
 *           type: integer
 *           example: 1
 *
 *     responses:
 *       204:
 *         description: Product deleted successfully.
 *
 *       400:
 *          $ref: '#/components/responses/BadRequest'   
 *
 *       401:
 *          $ref: '#/components/responses/Unauthorized'  
 *
 *       403:
 *          $ref: '#/components/responses/Forbidden'  
 *
 *       404:
 *          $ref: '#/components/responses/NotFound'  
 *
 *       500:
 *          $ref: '#/components/responses/InternalServerError'  
 */
router.delete('/:productId', validateAccessToken, validateRol(["ADMIN"]), deleteProduct);

export default router;