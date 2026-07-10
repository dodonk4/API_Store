import { jest } from '@jest/globals';
import { app } from '../../../src/app.ts'
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { resetDatabase } from '../../helpers/resetDatabase.ts';
import { getAdminAgent, getUserAgent } from '../../helpers/getAccessToken.ts';

describe('GET /ordenes', () => {
    beforeEach(async () => {
        await resetDatabase();
    });

    it('debería devolver 200 al encontrar una orden por su id, que corresponde al USER', async () => {

        const agent = await getUserAgent();

        const response = await agent
            .get('/ordenes/3');

        expect(response.status).toBe(200);
    });

    it('debería devolver 401 si se solicita una orden sin estar logueado', async () => {

        const response = await request(app)
            .get('/ordenes/1');

        expect(response.status).toBe(401);
    });

    it('debería devolver 403 si la orden no corresponde al usuario que la solicita', async () => {

        const agent = await getUserAgent();

        const response = await agent
            .get('/ordenes/1');

        expect(response.status).toBe(403);
    });

    it('debería devolver 404 si la orden no existe', async () => {
        const agent = await getAdminAgent();

        const response = await agent
            .get('/ordenes/999999');

        expect(response.status).toBe(404);
    });

    it('debería devolver 400 si el id es invalido', async () => {
        const agent = await getAdminAgent();

        const response = await agent
            .get('/ordenes/abcdef');

        expect(response.status).toBe(400);
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });
});
