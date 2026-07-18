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