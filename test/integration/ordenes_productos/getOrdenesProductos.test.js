import { jest } from '@jest/globals';
import { app } from '../../../src/app.ts'
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { getUserAgent } from '../../helpers/getAccessToken.ts';

describe('GET ordenes/:ordenId/products', ()=> {
    it('debería devolver 200 y una lista de los productos de la orden', async () => {
        const agent = await getUserAgent();

        const response = await agent
        .get(`/ordenes/3/products`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('debería devolver 404 por no existir la orden', async () => {
        const agent = await getUserAgent();

        const response = await agent
        .get(`/ordenes/999999/products`);

        expect(response.status).toBe(404);
    });

    it('debería devolver 401 por no haber usuario logueado', async () => {

        const response = await request(app)
        .get(`/ordenes/3/products`);

        expect(response.status).toBe(401);
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });
});