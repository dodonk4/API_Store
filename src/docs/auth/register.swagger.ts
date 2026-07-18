/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user.
 *     description: Creates a new user account.
 *     tags:
 *       - Authentication
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *
 *     responses:
 *       201:
 *         description: User registered successfully.
 *
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */