import { jest } from '@jest/globals';
import { app } from '../../../src/app.ts'
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { getAdminAgent, getUserAgent } from '../../helpers/getAccessToken.ts';

describe('GET /usuarios/:usuarioId', () => {
    it('debería devolver 200 cuando se solicita un usuario siendo ADMIN', async () => {
        const agent = await getAdminAgent();

        const response = await agent
            .get('/usuarios/1');

        expect(response.status).toBe(200);
    })

    it('debería devolver 404 cuando se solicita un usuario que no existe', async () => {
        const agent = await getAdminAgent();

        const response = await agent
            .get('/usuarios/9999999');

        expect(response.status).toBe(404);
    })

    it('debería devolver 400 cuando se solicita un usuario con un id inválido', async () => {
        const agent = await getAdminAgent();

        const response = await agent
            .get('/usuarios/abcedfg');

        expect(response.status).toBe(400);
    })

    it('debería recibir 403 cuando se solicita un usuario siendo USER', async () => {
        const agent = await getUserAgent();

        const response = await agent
            .get('/usuarios/1');

        expect(response.status).toBe(403);
    })

    it('debería recibir 401 cuando se solicita un usuario sin estar logueado', async () => {
        const response = await request(app)
            .get('/usuarios/1');

        expect(response.status).toBe(401);
    })

    afterAll(async () => {
        await prisma.$disconnect();
    });
});