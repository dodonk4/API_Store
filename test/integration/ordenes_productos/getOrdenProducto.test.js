import { jest } from '@jest/globals';
import { app } from '../../../src/app.ts'
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { getUserAgent } from '../../helpers/getAccessToken.ts';
import { resetDatabase } from '../../helpers/resetDatabase.ts';

describe('GET ordenes/:ordenId/products/:ordenProductoId', () => {

    beforeEach(async () => {
        await resetDatabase();
    });

    it('debería devolver 200 al devolver exitosamente un producto', async () => {

        const agent = await getUserAgent();

        const response = await agent
            .get(`/ordenes/3/products/5`);

        expect(response.status).toBe(200);
    })

    it('debería devolver 404 al no encontrar el producto', async () => {

        const agent = await getUserAgent();

        const response = await agent
            .get(`/ordenes/3/products/99999`);

        expect(response.status).toBe(404);
    })

    it('debería devolver 404 al no encontrar la orden', async () => {

        const agent = await getUserAgent();

        const response = await agent
            .get(`/ordenes/99999/products/5`);

        expect(response.status).toBe(404);
    })

    it('debería devolver 401 al no haber usuario logueado', async () => {

        const response = await request(app)
            .get(`/ordenes/3/products/5`);

        expect(response.status).toBe(401);
    })

    afterAll(async () => {
        await prisma.$disconnect();
    });
})