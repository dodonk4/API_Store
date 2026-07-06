import { jest } from '@jest/globals';
import { app } from '../../../src/app.ts'
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { getUserAgent } from '../../helpers/getAccessToken.ts';

describe('GET ordenes/:ordenId/products/:ordenProductoId', () => {
    it('debería devolver 200 al devolver exitosamente un producto', async () => {

        const agent = await getUserAgent();

        const response = await agent
            .get(`/ordenes/3/products/5`);

        expect(response.status).toBe(200);
    })

    afterAll(async () => {
        await prisma.$disconnect();
    });
})