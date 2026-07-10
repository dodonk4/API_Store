import { jest } from '@jest/globals';
import { app } from '../../../src/app.ts'
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { createManyProducts } from '../../helpers/createManyProducts.ts';

describe('GET /productos', () => {
    beforeEach(async () => {
        const relaciones = await prisma.ordenes_productos.findMany();

        await prisma.$executeRawUnsafe(`
            TRUNCATE TABLE "productos" RESTART IDENTITY CASCADE;
        `);

        await createManyProducts();

        for (const relacion of relaciones) {
            await prisma.ordenes_productos.create({
                data: {
                    ordenId: relacion.ordenId,
                    productId: relacion.productId,
                    precioUnitario: relacion.precioUnitario,
                    cantidad: relacion.cantidad,
                },
            });
        }
    });

    it('debería devolver la lista de productos', async () => {
        const response = await request(app).get('/productos');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(8);
    });

    it('debería devolver una lista vacía', async () => {
        const relaciones = await prisma.ordenes_productos.findMany();

        await prisma.$executeRawUnsafe(`
      TRUNCATE TABLE "productos" RESTART IDENTITY CASCADE;
    `);

        const response = await request(app).get('/productos');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);

        await createManyProducts();

        for (const relacion of relaciones) {
            await prisma.ordenes_productos.create({
                data: {
                    ordenId: relacion.ordenId,
                    productId: relacion.productId,
                    precioUnitario: relacion.precioUnitario,
                    cantidad: relacion.cantidad,
                },
            });
        }
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });
});