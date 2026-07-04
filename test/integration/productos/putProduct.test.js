import { app } from '../../../src/app.ts';
import request from 'supertest';
import { getAuthenticatedAgent } from '../../helpers/getAccessToken.ts';
import { productoActualizar } from '../../fixtures.ts';
import { prisma } from '../../../src/lib/prisma.ts';

describe('PUT /productos/:productoId', () => {
    it('debería devolver 200 al actualizar exitosamente un producto', async () => {
        let productoId = 9;

        const agent = await getAuthenticatedAgent();
        const response = await agent
            .put(`/productos/${productoId}`)
            .send(productoActualizar);

        expect(response.status).toBe(200);
    })

    it('debería devolver 404 al intentar actualizar un producto inexistente', async () => {
        let productoId = 99999;

        const agent = await getAuthenticatedAgent();
        const response = await agent
            .put(`/productos/${productoId}`)
            .send(productoActualizar);

        expect(response.status).toBe(404);
    })


    it('debería devolver 400 al intentar actualizar un producto con id invalido', async () => {
        let productoId = "abcdef";

        const agent = await getAuthenticatedAgent();
        const response = await agent
            .put(`/productos/${productoId}`)
            .send(productoActualizar);

        expect(response.status).toBe(400);
    })

    it('debería devolver 403 al no tener permiso de actualizar el producto', async () => {
        let productoId = "abcdef";

        const agent = await getAuthenticatedAgent();
        const response = await agent
            .put(`/productos/${productoId}`)
            .send(productoActualizar);

        expect(response.status).toBe(400);
    })

    afterAll(async () => {
        await prisma.$disconnect();
    });
})