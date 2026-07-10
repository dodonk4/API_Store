import { jest } from '@jest/globals';
import { app } from '../../../src/app.ts'
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { getAdminAgent, getUserAgent } from '../../helpers/getAccessToken.ts';
import { goodOrdenProducto } from '../../fixtures/ordenesProductos.fixtures.ts';
import { resetDatabase } from '../../helpers/resetDatabase.ts';

describe('DELETE ordenes/:ordenId/products/:ordenProductoId', () => {

    beforeEach(async () => {
        await resetDatabase();
    });

    it('debería devolver 200 al eliminar un producto de una orden ', async () => {

        const agent = await getUserAgent();

        const response = await agent
            .delete(`/ordenes/3/products/5`);

        expect(response.status).toBe(204);

    });

    it('debería devolver 404 al tratar de eliminar un producto que no existe de una orden', async () => {

        const agent = await getAdminAgent();

        const response = await agent
            .delete('/ordenes/3/products/999999');

        expect(response.status).toBe(404);
    });

    it('debería devolver 401 al tratar de eliminar un producto de una orden sin estar logueado', async () => {

        const response = await request(app)
            .delete('/ordenes/3/products/1');

        expect(response.status).toBe(401);
    });

    it('debería devolver 409 al tratar de eliminar un producto de una orden que no está en carrito', async () => {

        const agent = await getUserAgent();

        const response = await agent
            .delete('/ordenes/3/products/1');

        expect(response.status).toBe(409);
    });


    afterAll(async () => {
        await prisma.$disconnect();
    });
})