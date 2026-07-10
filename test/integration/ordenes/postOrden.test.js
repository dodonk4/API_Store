import { jest } from '@jest/globals';
import { app } from '../../../src/app.ts'
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { getAdminAgent, getUserAgent } from '../../helpers/getAccessToken.ts';
import { exceededQuantityOrdenProducto, goodOrdenProducto, nonExistingProductOrdenProducto } from '../../fixtures/ordenesProductos.fixture.ts';
import { resetDatabase } from '../../helpers/resetDatabase.ts';
import { badOrden, unauthorizedOrdenCrear } from '../../fixtures/ordenes.fixture.ts';

describe('POST /ordenes', () => {

    beforeEach(async () => {
        await resetDatabase();
    });

    it('debería devolver 200 por haber creado exitosamente una orden', async () => {
        const agent = await getUserAgent();

        const response = await agent
            .post(`/ordenes`)
            .send({});//Al estar vacío, lo crea como un nuevo CARRITO el propio usuario

        expect(response.status).toBe(200);

    });

    it('debería devolver 401 por intentar crear una orden de un usuario diferente sin ser ADMIN', async () => {

        const response = await request(app)
            .post('/ordenes')
            .send(unauthorizedOrdenCrear);

        expect(response.status).toBe(401);
    });

    it('debería devolver un error de zod 400 por subir mal el producto', async () => {
        const agent = await getAdminAgent();

        const response = await agent
            .post('/ordenes')
            .send(badOrden);

        expect(response.status).toBe(400);
    })

    afterAll(async () => {
        await prisma.$disconnect();
    });
})