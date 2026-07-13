import { jest } from '@jest/globals';
import { app } from '../../../src/app.ts'
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { getUserAgent } from '../../helpers/getAccessToken.ts';
import { exceededQuantityOrderProduct, goodOrderProduct, nonExistingProductOrderProduct } from '../../fixtures/ordersProducts.fixture.ts';
import { resetDatabase } from '../../helpers/resetDatabase.ts';

describe('POST orders/:orderId/products', () => {

    beforeEach(async () => {
        await resetDatabase();
    });

    it('debería devolver 200 por haber creado exitosamente un producto', async () => {
        const agent = await getUserAgent();

        const response = await agent
            .post(`/orders/3/products`)
            .send(goodOrderProduct);

        expect(response.status).toBe(200);
    })

    it('debería devolver 404 por no existir el producto que se quiere agregar', async () => {
        const agent = await getUserAgent();

        const response = await agent
            .post(`/orders/3/products`)
            .send(nonExistingProductOrderProduct);

        expect(response.status).toBe(404);
    })

    it('debería devolver 404 por no existir la orden en la que se quiere agregar', async () => {
        const agent = await getUserAgent();

        const response = await agent
            .post(`/orders/99999/products`)
            .send(goodOrderProduct);

        expect(response.status).toBe(404);
    })

    it('debería devolver 409 por no contar con la cantidad en stock del producto que quiere agregar el usuario', async () => {
        const agent = await getUserAgent();

        const response = await agent
            .post(`/orders/3/products`)
            .send(exceededQuantityOrderProduct);

        expect(response.status).toBe(409);
    });

    it('debería devolver 409 por intentar actualizar una orden con pago pendiente', async () => {
        const agent = await getUserAgent();

        const response = await agent
            .post(`/orders/4/products`)
            .send(goodOrderProduct);

        expect(response.status).toBe(409);
    })

    it('debería devolver 409 por intentar actualizar una orden ya pagada', async () => {
        const agent = await getUserAgent();

        const response = await agent
            .post(`/orders/5/products`)
            .send(goodOrderProduct);

        expect(response.status).toBe(409);
    })

    afterAll(async () => {
        await prisma.$disconnect();
    });
})