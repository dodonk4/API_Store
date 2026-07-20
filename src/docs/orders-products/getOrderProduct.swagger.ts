/**
 * @swagger
 * /orders/{orderId}/products/{orderProductId}:
 *   get:
 *     summary: Get an order product by ID.
 *     description: Returns a specific product associated with the specified order.
 *     tags:
 *       - Orders
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *
 *       - in: path
 *         name: orderProductId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5
 *
 *     responses:
 *       200:
 *         description: Order product retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderProduct'
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