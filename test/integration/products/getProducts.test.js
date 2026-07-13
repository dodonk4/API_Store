import { jest } from '@jest/globals';
import { app } from '../../../src/app.ts'
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { resetDatabase } from '../../helpers/resetDatabase.ts';

describe('GET /products', () => {
    beforeEach(async () => {
        await resetDatabase();
    });

    it('debería devolver la lista de products', async () => {
        const response = await request(app).get('/products');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(8);
    });

    it('debería devolver una lista vacía', async () => {

        await prisma.$executeRawUnsafe(`
      TRUNCATE TABLE "products" RESTART IDENTITY CASCADE;
    `);

        const response = await request(app).get('/products');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);

    });

    afterAll(async () => {
        await prisma.$disconnect();
    });
});