import { jest } from '@jest/globals';
import { app } from '../../../src/app.ts'
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { getAdminAgent, getUserAgent } from '../../helpers/getAccessToken.ts';
import { goodOrdenProducto } from '../../fixtures/ordenesProductos.fixtures.ts';

describe('DELETE ordenes/:ordenId/products/:ordenProductoId', () => {
    it('debería devolver 200 al eliminar un orden_producto ', async () => {

        const agent = await getUserAgent();

        await agent
            .post(`/ordenes/3/products`)
            .send(goodOrdenProducto);

        const response = await agent
            .delete(`/ordenes/3/products/9`);

        expect(response.status).toBe(204);

    });

    // it('debería devolver 404 al tratar de eliminar un orden_producto que no existe', async () => {

    //     const agent = await getAdminAgent();

    //     const response = await agent
    //         .delete('/productos/999999');

    //     expect(response.status).toBe(404);
    // });

    // it('debería devolver 401 al tratar de eliminar un producto sin estar logueado', async () => {

    //     const response = await request(app)
    //         .delete('/productos/1');

    //     expect(response.status).toBe(401);
    // });

    // it('debería devolver 403 al tratar de eliminar un producto siendo USER', async () => {

    //     const agent = await getUserAgent();

    //     const response = await agent
    //         .delete('/productos/1');

    //     expect(response.status).toBe(403);
    // });


    afterAll(async () => {
        await prisma.$disconnect();
    });
})