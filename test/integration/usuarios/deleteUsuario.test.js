import { jest } from '@jest/globals';
import { app } from '../../../src/app.ts'
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { getAdminAgent, getUserAgent } from '../../helpers/getAccessToken.ts';
import { usuarioCrear } from '../../fixtures/usuarios.fixture.ts';

describe('DELETE usuarios/:usuarioId', () => {
    it('debería devolver 204 al eliminar un usuario siendo ADMIN', async () => {

        const agent = await getAdminAgent();

        const nuevoUsuario = await prisma.usuarios.create({ data: usuarioCrear });

        const response = await agent
            .delete(`/usuarios/${nuevoUsuario.id}`);

        expect(response.status).toBe(204);
    });

    it('debería devolver 404 al tratar de eliminar un usuario que no existe', async () => {

        const agent = await getAdminAgent();

        const response = await agent
            .delete('/usuarios/999999');

        expect(response.status).toBe(404);
    });

    it('debería devolver 401 al tratar de eliminar un usuario sin estar logueado', async () => {

        const response = await request(app)
            .delete('/usuarios/1');

        expect(response.status).toBe(401);
    });

    it('debería devolver 403 al tratar de eliminar un usuario siendo USER', async () => {

        const agent = await getUserAgent();

        const response = await agent
            .delete('/usuarios/1');

        expect(response.status).toBe(403);
    });


    afterAll(async () => {
        await prisma.$disconnect();
    });
})