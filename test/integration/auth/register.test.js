import { jest } from '@jest/globals';
import { app } from '../../../src/app.ts'
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { badRegister, emailRepeatedRegister, goodRegister, nonValidEmailRegister, nonValidPasswordRegister } from '../../fixtures/register.fixture.ts';

describe('POST auth/register', () => {
    it('debería devolver 200 por registro exitoso', async () => {

        const response = await request(app)
            .post('/auth/register')
            .send(goodRegister);

        expect(response.status).toBe(201);

        const id = response.body.id;

        await prisma.users.delete({ where: { id } });
    })

    it('debería devolver 400 por falta de datos (sea tanto email, contraseña como confirmación de contraseña)', async () => {

        const response = await request(app)
            .post('/auth/register')
            .send(badRegister);

        expect(response.status).toBe(400);

    })

    it('debería devolver 409 por correo electrónico ya registrado', async () => {

        const response = await request(app)
            .post('/auth/register')
            .send(emailRepeatedRegister);

        expect(response.status).toBe(409);

    })

    it('debería devolver 400 por correo electrónico inválido', async () => {

        const response = await request(app)
            .post('/auth/register')
            .send(nonValidEmailRegister);

        expect(response.status).toBe(400);

    })

    it('debería devolver 400 por contraseña incorrecta', async () => {

        const response = await request(app)
            .post('/auth/register')
            .send(nonValidPasswordRegister);

        expect(response.status).toBe(400);

    })

    afterAll(async () => {
        await prisma.$disconnect();
    });
})