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