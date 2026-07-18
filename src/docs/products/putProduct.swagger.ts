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
