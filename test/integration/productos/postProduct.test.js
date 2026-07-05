import { getAuthenticatedAgent, getNonAuthenticatedAgent } from '../../helpers/getAccessToken.ts';
import { logoutHelper } from '../../helpers/logout.ts';
import { app } from '../../../src/app.ts';
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { badProductoCrear, productoCrear } from '../../fixtures/productos.ts';
import { id } from 'zod/locales';

describe('POST /productos', () => {


  beforeEach(async () => {
    await logoutHelper();
  })

  it('debería crear un producto', async () => {

    const agent = await getAuthenticatedAgent();

    const response = await agent
      .post('/productos')
      .send(productoCrear);

    expect(response.status).toBe(200);

    const id = response.body.id;

    await prisma.productos.delete({ where: { id } });
  });

  it('debería rechazar por no tener un token', async () => {

    const response = await request(app)
      .post('/productos')
      .send(productoCrear);

    expect(response.status).toBe(401);
  });

  it('debería devolver un 403 por tener prohibido agregar productos', async () => {

    const agent = await getNonAuthenticatedAgent();

    const response = await agent
      .post('/productos')
      .send(productoCrear);

    expect(response.status).toBe(403);
  });

  
  it('debería devolver un error de zod 400 por subir mal el producto', async () => {
    const agent = await getAuthenticatedAgent();

    const response = await agent
      .post('/productos')
      .send(badProductoCrear);

    expect(response.status).toBe(400);
    
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

});