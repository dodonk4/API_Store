import { jest } from '@jest/globals';
import { app } from '../../../src/app.ts'
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { getAdminAgent, getUserAgent } from '../../helpers/getAccessToken.ts';
import { userCreate } from '../../fixtures/users.fixture.ts';
import { resetDatabase } from '../../helpers/resetDatabase.ts';

describe('DELETE users/:userId', () => {

    beforeEach(async () => {
        await resetDatabase();
    });

    it('debería devolver 204 al eliminar un user siendo ADMIN', async () => {

        const agent = await getAdminAgent();

        const newUser = await prisma.users.create({ data: userCreate });

        const response = await agent
            .delete(`/users/${newUser.id}`);

        expect(response.status).toBe(204);
    });

    it('debería devolver 404 al tratar de eliminar un user que no existe', async () => {

        const agent = await getAdminAgent();

        const response = await agent
            .delete('/users/999999');

        expect(response.status).toBe(404);
    });

    it('debería devolver 401 al tratar de eliminar un user sin estar logueado', async () => {

        const response = await request(app)
            .delete('/users/1');

        expect(response.status).toBe(401);
    });

    it('debería devolver 403 al tratar de eliminar un user siendo USER', async () => {

        const agent = await getUserAgent();

        const response = await agent
            .delete('/users/1');

        expect(response.status).toBe(403);
    });


    afterAll(async () => {
        await prisma.$disconnect();
    });
})