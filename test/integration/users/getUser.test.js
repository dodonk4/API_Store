import { jest } from '@jest/globals';
import { app } from '../../../src/app.ts'
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { getAdminAgent, getUserAgent } from '../../helpers/getAccessToken.ts';
import { resetDatabase } from '../../helpers/resetDatabase.ts';

describe('GET /users/:userId', () => {

    beforeEach(async () => {
        await resetDatabase();
    });

    it('debería devolver 200 cuando se solicita un user siendo ADMIN', async () => {
        const agent = await getAdminAgent();

        const response = await agent
            .get('/users/1');

        expect(response.status).toBe(200);
    })

    it('debería devolver 404 cuando se solicita un user que no existe', async () => {
        const agent = await getAdminAgent();

        const response = await agent
            .get('/users/9999999');

        expect(response.status).toBe(404);
    })

    it('debería devolver 400 cuando se solicita un user con un id inválido', async () => {
        const agent = await getAdminAgent();

        const response = await agent
            .get('/users/abcedfg');

        expect(response.status).toBe(400);
    })

    it('debería recibir 403 cuando se solicita un user siendo USER', async () => {
        const agent = await getUserAgent();

        const response = await agent
            .get('/users/1');

        expect(response.status).toBe(403);
    })

    it('debería recibir 401 cuando se solicita un user sin estar logueado', async () => {
        const response = await request(app)
            .get('/users/1');

        expect(response.status).toBe(401);
    })

    afterAll(async () => {
        await prisma.$disconnect();
    });
});