import { jest } from '@jest/globals';
import { app } from '../../../src/app.ts'
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { getAdminAgent, getUserAgent } from '../../helpers/getAccessToken.ts';
import { resetDatabase } from '../../helpers/resetDatabase.ts';
import { badOrder, unauthorizedOrderCreate } from '../../fixtures/orders.fixture.ts';

describe('POST /orders', () => {

    beforeEach(async () => {
        await resetDatabase();
    });

    it('debería devolver 200 por haber creado exitosamente una orden', async () => {
        const agent = await getUserAgent();

        const response = await agent
            .post(`/orders`)
            .send({});//Al estar vacío, lo crea como un nuevo CARRITO el propio usuario

        expect(response.status).toBe(200);

    });

    it('debería devolver 401 por intentar crear una orden de un usuario diferente sin ser ADMIN', async () => {

        const response = await request(app)
            .post('/orders')
            .send(unauthorizedOrderCreate);

        expect(response.status).toBe(401);
    });

    it('debería devolver un error de zod 400 por subir mal el producto', async () => {
        const agent = await getAdminAgent();

        const response = await agent
            .post('/orders')
            .send(badOrder);

        expect(response.status).toBe(400);
    })

    afterAll(async () => {
        await prisma.$disconnect();
    });
})