import { getAdminAgent, getNonAuthenticatedAgent } from '../../helpers/getAccessToken.ts';
import { logoutHelper } from '../../helpers/logout.ts';
import { app } from '../../../src/app.ts';
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { badUserCreate, userCreate } from '../../fixtures/users.fixture.ts';
import { id } from 'zod/locales';
import { resetDatabase } from '../../helpers/resetDatabase.ts';

describe('POST /users', () => {

  beforeEach(async () => {
    await logoutHelper();
    await resetDatabase();
  })

  it('debería crear un usuario siendo ADMIN', async () => {

    const agent = await getAdminAgent();

    const response = await agent
      .post('/users')
      .send(userCreate);

    expect(response.status).toBe(201);


  });

  it('debería rechazar por no tener un token', async () => {

    const response = await request(app)
      .post('/users')
      .send(userCreate);

    expect(response.status).toBe(401);
  });

  it('debería devolver un 403 por tener prohibido agregar users', async () => {

    const agent = await getNonAuthenticatedAgent();

    const response = await agent
      .post('/users')
      .send(userCreate);

    expect(response.status).toBe(403);
  });

  
  it('debería devolver un error de zod 400 por subir mal el usuario', async () => {
    const agent = await getAdminAgent();

    const response = await agent
      .post('/users')
      .send(badUserCreate);

    expect(response.status).toBe(400);
    
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

});