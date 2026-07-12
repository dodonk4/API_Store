import { jest } from '@jest/globals';
import { app } from '../../../src/app.ts'
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { resetDatabase } from '../../helpers/resetDatabase.ts';

describe('GET /productos/:productoId', () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  it('debería devolver un producto por su id', async () => {

    let productoId = 1;

    const response = await request(app)
      .get(`/productos/${productoId}`);

    expect(response.status).toBe(200);
  });

  it('debería devolver 404 si el producto no existe', async () => {
    const response = await request(app)
      .get('/productos/999999');

    expect(response.status).toBe(404);
  });

  it('debería devolver 400 si el id es invalido', async () => {
    const response = await request(app)
      .get('/productos/abcdef');

    expect(response.status).toBe(400);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
