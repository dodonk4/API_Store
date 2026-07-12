import { jest } from '@jest/globals';
import { app } from '../../../src/app.ts'
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { getAdminAgent, getUserAgent } from '../../helpers/getAccessToken.ts';
import { resetDatabase } from '../../helpers/resetDatabase.ts';
import { badOrden, goodOrdenUpdate, unauthorizedOrdenCrear } from '../../fixtures/ordenes.fixture.ts';

describe('PUT /ordenes', () => {

    beforeEach(async () => {
        await resetDatabase();
    });

    it('debería devolver 200 por haber actualizado exitosamente una orden', async () => {
        const agent = await getUserAgent();

        const response = await agent
            .put('/ordenes/3')
            .send(goodOrdenUpdate);

        expect(response.status).toBe(200);

    });

    it('debería devolver 401 por querer actualizar una orden al estar deslogueado', async () => {

        const response = await request(app)
            .put('/ordenes/3')
            .send(goodOrdenUpdate);

        expect(response.status).toBe(401);

    });

    it('debería devolver 404 por intentar actualizar una orden inexistente', async () => {
        const agent = await getAdminAgent();

        const response = await agent
            .put(`/ordenes/99999`)
            .send(goodOrdenUpdate);

        expect(response.status).toBe(404);

    });

    it('debería devolver 403 por intentar actualizar una orden de un usuario diferente sin ser ADMIN', async () => {
        const agent = await getUserAgent();

        const response = await agent
            .put('/ordenes/1')
            .send(goodOrdenUpdate);

        expect(response.status).toBe(403);
    });

    it('debería devolver un error de zod 400 por actualizar enivar datos invalidos', async () => {
        const agent = await getAdminAgent();

        const response = await agent
            .put('/ordenes/3')
            .send(badOrden);

        expect(response.status).toBe(400);
    })

    afterAll(async () => {
        await prisma.$disconnect();
    });
})