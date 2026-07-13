import { app } from '../../../src/app.ts';
import request from 'supertest';
import { getAdminAgent, getNonAuthenticatedAgent } from '../../helpers/getAccessToken.ts';
import { badUserCreate, userUpdate } from '../../fixtures/users.fixture.ts';
import { prisma } from '../../../src/lib/prisma.ts';
import { resetDatabase } from '../../helpers/resetDatabase.ts';

describe('PUT /users/:userId', () => {

    beforeEach(async () => {
        await resetDatabase();
    });

    it('debería devolver 200 al actualizar exitosamente un user', async () => {
        let userId = 3;

        const agent = await getAdminAgent();
        const response = await agent
            .put(`/users/${userId}`)
            .send(userUpdate);

        expect(response.status).toBe(200);
        
    })


    it('debería devolver 404 al intentar actualizar un user inexistente', async () => {
        let userId = 99999;

        const agent = await getAdminAgent();
        const response = await agent
            .put(`/users/${userId}`)
            .send(userUpdate);

        expect(response.status).toBe(404);
    })


    it('debería devolver 400 al intentar actualizar un user con id invalido', async () => {
        let userId = "abcdef";

        const agent = await getAdminAgent();
        const response = await agent
            .put(`/users/${userId}`)
            .send(userUpdate);

        expect(response.status).toBe(400);
    })

    it('debería devolver 401 al no encontrar un token', async () => {
        let userId = 8;

        const response = await request(app)
            .put(`/users/${userId}`)
            .send(userUpdate);

        expect(response.status).toBe(401);
    })

    it('debería devolver 403 al intentar actualizar un user siendo USER', async () => {
        let userId = 8;

        const agent = await getNonAuthenticatedAgent();
        const response = await agent
            .put(`/users/${userId}`)
            .send(userUpdate);

        expect(response.status).toBe(403);
    })

    it('debería devolver un error de zod 400 por subir mal los datos a actualizar del user', async () => {
        const agent = await getAdminAgent();

        const res = await agent
            .post('/users')
            .send(badUserCreate);//El badUserCreate sirve también para la actualización mala

        expect(res.status).toBe(400);

    });

    afterAll(async () => {
        await prisma.$disconnect();
    });
})