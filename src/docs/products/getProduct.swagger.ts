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