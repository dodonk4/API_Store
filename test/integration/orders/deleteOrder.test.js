import { jest } from '@jest/globals';
import { app } from '../../../src/app.ts'
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { getAdminAgent, getUserAgent } from '../../helpers/getAccessToken.ts';
import { resetDatabase } from '../../helpers/resetDatabase.ts';

describe('DELETE /orders/:orderId', () => {

    beforeEach(async () => {
        await resetDatabase();
    });

    it('debería devolver 204 al eliminar una orden', async () => {

        const agent = await getUserAgent();

        const response = await agent
            .delete('/orders/3');

        expect(response.status).toBe(204);
    });

    it('debería devolver 404 al tratar de eliminar una orden que no existe', async () => {

        const agent = await getAdminAgent();

        const response = await agent
            .delete('/orders/999999');

        expect(response.status).toBe(404);
    });

    it('debería devolver 401 al tratar de eliminar una orden sin estar logueado', async () => {

        const response = await request(app)
            .delete('/orders/3');

        expect(response.status).toBe(401);
    });

    it('debería devolver 403 al tratar de eliminar una orden que no le corresponde a su usuario', async () => {

        const agent = await getUserAgent();

        const response = await agent
            .delete('/orders/1');

        expect(response.status).toBe(403);
    });


    afterAll(async () => {
        await prisma.$disconnect();
    });
})