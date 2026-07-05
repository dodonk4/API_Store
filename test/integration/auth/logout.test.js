import { jest } from '@jest/globals';
import jwt from 'jsonwebtoken';
import { app } from '../../../src/app.ts'
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { getAdminAgent } from '../../helpers/getAccessToken.ts';
import authConfig from '../../../src/config/auth.config.ts';

describe('POST auth/logout', () => {
    it('debería devolver 200 por logout exitoso', async () => {
        const agent = await getAdminAgent();

        const response = await agent
            .post('/auth/logout');

        expect(response.status).toBe(200);
    })

    it('debería devolver 401 por no haber usuario logueado', async () => {
        const response = await request(app)
            .post('/auth/logout');

        expect(response.status).toBe(401);
    })

    it('debería devolver 401 por contar con refresh token inválido', async () => {
        //Se forza un refresh invalido, firmandolo con la firma del access_token
        const refreshToken = jwt.sign(
            { id: 1 },
            authConfig.secret,
            { expiresIn: "24h" }
        );

        const response = await request(app)
            .post('/auth/logout')
            .set('Cookie', [`refresh_token=${refreshToken}`]);

        expect(response.status).toBe(401);
    })

    afterAll(async () => {
        await prisma.$disconnect();
    });
})