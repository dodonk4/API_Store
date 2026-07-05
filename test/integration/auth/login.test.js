import { jest } from '@jest/globals';
import { app } from '../../../src/app.ts'
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { emailNotFoundLogin, goodLogin, nonEmailLogin, nonPasswordLogin, wrongPasswordLogin } from '../../fixtures/login.fixture.ts';

describe('POST auth/login', () => {
    it('debería devolver 200 por un login exitoso', async () => {

        const response = await request(app)
        .post('/auth/login')
        .send(goodLogin);

        expect(response.status).toBe(200);
    })

    it('debería devolver 400 por falta de email', async () => {

        const response = await request(app)
        .post('/auth/login')
        .send(nonEmailLogin);

        expect(response.status).toBe(400);
    })

    it('debería devolver 400 por falta de contraseña', async () => {

        const response = await request(app)
        .post('/auth/login')
        .send(nonPasswordLogin);

        expect(response.status).toBe(400);
    })

    it('debería devolver 404 por no encontrar usuario con el email ingresado', async () => {

        const response = await request(app)
        .post('/auth/login')
        .send(emailNotFoundLogin);

        expect(response.status).toBe(404);
    })

    it('debería devolver 401 por contraseña invalida', async () => {

        const response = await request(app)
        .post('/auth/login')
        .send(wrongPasswordLogin);

        expect(response.status).toBe(401);
    })

    afterAll(async () => {
        await prisma.$disconnect();
    });
})