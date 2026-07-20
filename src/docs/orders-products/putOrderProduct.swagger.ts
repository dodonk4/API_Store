/**
 * @swagger
 * /orders/{orderId}/products/{orderProductId}:
 *   put:
 *     summary: Update an order product.
 *     description: Updates the quantity or information of a product in an order.
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrderProductRequest'
 *
 *     responses:
 *       200:
 *         description: Order product updated successfully.
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