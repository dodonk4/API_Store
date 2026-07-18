/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders.
 *     description: Returns a list of all orders.
 *     tags:
 *       - Orders
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Orders retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */