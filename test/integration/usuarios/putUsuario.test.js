import { app } from '../../../src/app.ts';
import request from 'supertest';
import { getAdminAgent, getNonAuthenticatedAgent } from '../../helpers/getAccessToken.ts';
import { badUsuarioCrear, usuarioActualizar, usuarioActualizarRollback } from '../../fixtures/usuarios.fixture.ts';
import { prisma } from '../../../src/lib/prisma.ts';

describe('PUT /usuarios/:usuarioId', () => {
    it('debería devolver 200 al actualizar exitosamente un usuario', async () => {
        let usuarioId = 3;

        const agent = await getAdminAgent();
        const response = await agent
            .put(`/usuarios/${usuarioId}`)
            .send(usuarioActualizar);

        expect(response.status).toBe(200);
        
        await prisma.usuarios.update({ where: { id: usuarioId }, data: usuarioActualizarRollback})
    })


    it('debería devolver 404 al intentar actualizar un usuario inexistente', async () => {
        let usuarioId = 99999;

        const agent = await getAdminAgent();
        const response = await agent
            .put(`/usuarios/${usuarioId}`)
            .send(usuarioActualizar);

        expect(response.status).toBe(404);
    })


    it('debería devolver 400 al intentar actualizar un usuario con id invalido', async () => {
        let usuarioId = "abcdef";

        const agent = await getAdminAgent();
        const response = await agent
            .put(`/usuarios/${usuarioId}`)
            .send(usuarioActualizar);

        expect(response.status).toBe(400);
    })

    it('debería devolver 401 al no encontrar un token', async () => {
        let usuarioId = 8;

        const response = await request(app)
            .put(`/usuarios/${usuarioId}`)
            .send(usuarioActualizar);

        expect(response.status).toBe(401);
    })

    it('debería devolver 403 al intentar actualizar un usuario siendo USER', async () => {
        let usuarioId = 8;

        const agent = await getNonAuthenticatedAgent();
        const response = await agent
            .put(`/usuarios/${usuarioId}`)
            .send(usuarioActualizar);

        expect(response.status).toBe(403);
    })

    it('debería devolver un error de zod 400 por subir mal los datos a actualizar del usuario', async () => {
        const agent = await getAdminAgent();

        const res = await agent
            .post('/usuarios')
            .send(badUsuarioCrear);//El badUsuarioCrear sirve también para la actualización mala

        expect(res.status).toBe(400);

    });

    afterAll(async () => {
        await prisma.$disconnect();
    });
})