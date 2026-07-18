/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out.
 *     description: Invalidates the current refresh token.
 *     tags:
 *       - Authentication
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       204:
 *         description: Logged out successfully.
 *
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */