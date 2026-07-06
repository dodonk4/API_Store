import { getAdminAgent, getNonAuthenticatedAgent } from '../../helpers/getAccessToken.ts';
import { logoutHelper } from '../../helpers/logout.ts';
import { app } from '../../../src/app.ts';
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { badUsuarioCrear, usuarioCrear } from '../../fixtures/usuarios.fixture.ts';
import { id } from 'zod/locales';

describe('POST /usuarios', () => {

  beforeEach(async () => {
    await logoutHelper();
  })

  it('debería crear un usuario siendo ADMIN', async () => {

    const agent = await getAdminAgent();

    const response = await agent
      .post('/usuarios')
      .send(usuarioCrear);

    expect(response.status).toBe(201);

    const id = response.body.id;

    const deleteUsuario = await prisma.usuarios.delete({ where: { id } });


  });

  it('debería rechazar por no tener un token', async () => {

    const response = await request(app)
      .post('/usuarios')
      .send(usuarioCrear);

    expect(response.status).toBe(401);
  });

  it('debería devolver un 403 por tener prohibido agregar usuarios', async () => {

    const agent = await getNonAuthenticatedAgent();

    const response = await agent
      .post('/usuarios')
      .send(usuarioCrear);

    expect(response.status).toBe(403);
  });

  
  it('debería devolver un error de zod 400 por subir mal el usuario', async () => {
    const agent = await getAdminAgent();

    const response = await agent
      .post('/usuarios')
      .send(badUsuarioCrear);

    expect(response.status).toBe(400);
    
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

});