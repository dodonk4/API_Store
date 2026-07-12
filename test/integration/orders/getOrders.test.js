import { jest } from '@jest/globals';
import { app } from '../../../src/app.ts'
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { getAdminAgent, getUserAgent } from '../../helpers/getAccessToken.ts';
import { resetDatabase } from '../../helpers/resetDatabase.ts';

describe('GET orders', () => {

    beforeEach(async () => {
        await resetDatabase();
    });

    it('debería devolver 200 y una lista de ordenes al ser ADMIN', async () => {
        const agent = await getAdminAgent();

        const response = await agent
            .get(`/orders`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('debería devolver 403 al solicitar ordenes siendo USER', async () => {
        const agent = await getUserAgent();

        const response = await agent
            .get('/orders');

        expect(response.status).toBe(403);
    })

    it('debería devolver 401 por no haber usuario logueado', async () => {

        const response = await request(app)
            .get(`/orders`);

        expect(response.status).toBe(401);
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });
});