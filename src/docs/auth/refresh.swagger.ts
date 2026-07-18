/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh access token.
 *     description: Generates a new access token using a valid refresh token.
 *     tags:
 *       - Authentication
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Access token refreshed successfully.
 *
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */