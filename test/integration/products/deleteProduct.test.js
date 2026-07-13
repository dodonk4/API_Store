import { jest } from '@jest/globals';
import { app } from '../../../src/app.ts'
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { getAdminAgent, getUserAgent } from '../../helpers/getAccessToken.ts';
import { productCreate } from '../../fixtures/products.fixture.ts';
import { resetDatabase } from '../../helpers/resetDatabase.ts';

describe('DELETE products/:productId', () => {

    beforeEach(async () => {
        await resetDatabase();
    });

    it('debería devolver 204 al eliminar un producto siendo ADMIN', async () => {

        const agent = await getAdminAgent();

        const newProduct = await prisma.products.create({ data: productCreate });

        const response = await agent
            .delete(`/products/${newProduct.id}`);

        expect(response.status).toBe(204);
    });

    it('debería devolver 404 al tratar de eliminar un producto que no existe', async () => {

        const agent = await getAdminAgent();

        const response = await agent
            .delete('/products/999999');

        expect(response.status).toBe(404);
    });

    it('debería devolver 401 al tratar de eliminar un producto sin estar logueado', async () => {

        const response = await request(app)
            .delete('/products/1');

        expect(response.status).toBe(401);
    });

    it('debería devolver 403 al tratar de eliminar un producto siendo USER', async () => {

        const agent = await getUserAgent();

        const response = await agent
            .delete('/products/1');

        expect(response.status).toBe(403);
    });


    afterAll(async () => {
        await prisma.$disconnect();
    });
})