/**
 * @swagger
 * /orders/{orderId}:
 *   delete:
 *     summary: Delete an order.
 *     description: Deletes the order associated with the specified ID.
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
 *         description: Order ID.
 *         schema:
 *           type: integer
 *           example: 1
 *
 *     responses:
 *       204:
 *         description: Order deleted successfully.
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