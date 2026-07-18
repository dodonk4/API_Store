/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Delete a user.
 *     description: Deletes the user associated with the specified ID.
 *     tags:
 *       - Users
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID.
 *         schema:
 *           type: integer
 *           example: 1
 *
 *     responses:
 *       204:
 *         description: User deleted successfully.
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