import { getAdminAgent, getNonAuthenticatedAgent } from '../../helpers/getAccessToken.ts';
import { logoutHelper } from '../../helpers/logout.ts';
import { app } from '../../../src/app.ts';
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { badProductoCrear, productoCrear } from '../../fixtures/productos.fixture.ts';
import { id } from 'zod/locales';
import { resetDatabase } from '../../helpers/resetDatabase.ts';

describe('POST /productos', () => {


  beforeEach(async () => {
    await logoutHelper();
    await resetDatabase();
  })

  it('debería devolver 200 al crear un producto', async () => {

    const agent = await getAdminAgent();

    const response = await agent
      .post('/productos')
      .send(productoCrear);

    expect(response.status).toBe(200);
  });

  it('debería devolver 401 por no estar logueado', async () => {

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
    const agent = await getAdminAgent();

    const response = await agent
      .post('/productos')
      .send(badProductoCrear);

    expect(response.status).toBe(400);
    
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

});