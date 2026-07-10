import { jest } from '@jest/globals';
import { app } from '../../../src/app.ts'
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { getUserAgent } from '../../helpers/getAccessToken.ts';
import { exceededQuantityOrdenProducto, goodOrdenProducto, nonExistingProductOrdenProducto } from '../../fixtures/ordenesProductos.fixtures.ts';
import { resetDatabase } from '../../helpers/resetDatabase.ts';

describe('POST ordenes/:ordenId/products', () => {

    beforeEach(async () => {
        await resetDatabase();
    });

    it('debería devolver 200 por haber creado exitosamente un producto', async () => {
        const agent = await getUserAgent();

        const response = await agent
            .post(`/ordenes/3/products`)
            .send(goodOrdenProducto);

        expect(response.status).toBe(200);

        const id = response.body.id;

        await prisma.ordenes_productos.delete({ where: { id } });
    })

    it('debería devolver 404 por no existir el producto que se quiere agregar', async () => {
        const agent = await getUserAgent();

        const response = await agent
            .post(`/ordenes/3/products`)
            .send(nonExistingProductOrdenProducto);

        expect(response.status).toBe(404);
    })

    it('debería devolver 404 por no existir la orden en la que se quiere agregar', async () => {
        const agent = await getUserAgent();

        const response = await agent
            .post(`/ordenes/99999/products`)
            .send(goodOrdenProducto);

        expect(response.status).toBe(404);
    })

    it('debería devolver 409 por no contar con la cantidad en stock del producto que quiere agregar el usuario', async () => {
        const agent = await getUserAgent();

        const response = await agent
            .post(`/ordenes/3/products`)
            .send(exceededQuantityOrdenProducto);

        expect(response.status).toBe(409);
    });

    it('debería devolver 409 por intentar actualizar una orden con pago pendiente', async () => {
        const agent = await getUserAgent();

        const response = await agent
            .post(`/ordenes/4/products`)
            .send(goodOrdenProducto);

        expect(response.status).toBe(409);
    })

    it('debería devolver 409 por intentar actualizar una orden ya pagada', async () => {
        const agent = await getUserAgent();

        const response = await agent
            .post(`/ordenes/5/products`)
            .send(goodOrdenProducto);

        expect(response.status).toBe(409);
    })

    afterAll(async () => {
        await prisma.$disconnect();
    });
})