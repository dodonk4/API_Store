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