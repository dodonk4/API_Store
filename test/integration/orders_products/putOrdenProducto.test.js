import { jest } from '@jest/globals';
import { app } from '../../../src/app.ts'
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { getUserAgent } from '../../helpers/getAccessToken.ts';
import { exceededQuantityOrdenProducto, goodOrdenProducto, goodOrdenProductoActualizar, nonExistingProductOrdenProducto, rollback } from '../../fixtures/ordenesProductos.fixture.ts';
import { resetDatabase } from '../../helpers/resetDatabase.ts';

describe('PUT ordenes/:ordenId/products/:ordenProductoId', () => {

    beforeEach(async () => {
        await resetDatabase();
    });

    it('debería devolver 200 por haber actualizado exitosamente un producto', async () => {
        const agent = await getUserAgent();

        const response = await agent
            .put(`/ordenes/3/products/5`)
            .send(goodOrdenProductoActualizar);

        expect(response.status).toBe(200);

    })

    it('debería devolver 404 por no existir el producto que se quiere reemplazar en la orden', async () => {
        const agent = await getUserAgent();

        const response = await agent
            .put(`/ordenes/3/products/5`)
            .send(nonExistingProductOrdenProducto);

        expect(response.status).toBe(404);
    })

    it('debería devolver 404 por no existir la orden en la que se quiere actualizar', async () => {
        const agent = await getUserAgent();

        const response = await agent
            .put(`/ordenes/99999/products/5`)
            .send(goodOrdenProducto);

        expect(response.status).toBe(404);
    })

    it('debería devolver 409 por no contar con la cantidad en stock del producto que quiere agregar el usuario', async () => {
        const agent = await getUserAgent();

        const response = await agent
            .put(`/ordenes/3/products/5`)
            .send(exceededQuantityOrdenProducto);

        expect(response.status).toBe(409);

    });

    it('debería devolver 409 por intentar actualizar una orden con pago pendiente', async () => {
        const agent = await getUserAgent();

        const response = await agent
            .put(`/ordenes/4/products/7`)
            .send(goodOrdenProducto);

        expect(response.status).toBe(409);
    })

    it('debería devolver 409 por intentar actualizar una orden ya pagada', async () => {
        const agent = await getUserAgent();

        const response = await agent
            .put(`/ordenes/5/products/6`)
            .send(goodOrdenProducto);

        expect(response.status).toBe(409);
    })

    afterAll(async () => {
        await prisma.$disconnect();
    });
})