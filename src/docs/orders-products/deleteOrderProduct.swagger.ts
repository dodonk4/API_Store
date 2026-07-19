/**
 * @swagger
 * /orders/{orderId}/products/{orderProductId}:
 *   delete:
 *     summary: Remove a product from an order.
 *     description: Removes a product from an existing order.
 *     tags:
 *       - Order Products
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: orderProductId
 *         required: true
 *         description: Order product ID.
 *         schema:
 *           type: integer
 *           example: 1
 *
 *     responses:
 *       204:
 *         description: Product removed from the order successfully.
 *
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */