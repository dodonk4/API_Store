import { jest } from '@jest/globals';
import jwt from 'jsonwebtoken';
import { app } from '../../../src/app.ts'
import request from 'supertest';
import { prisma } from '../../../src/lib/prisma.ts';
import { getAdminAgent } from '../../helpers/getAccessToken.ts';
import { logoutHelper } from '../../helpers/logout.ts';
import authConfig from '../../../src/config/auth.config.ts';

describe('POST auth/refresh', () => {
    it('debería devolver 200 al generar un access token exitosamente', async () => {
        const agent = await getAdminAgent();

        const response = await agent
            .post('/auth/refresh');

        expect(response.status).toBe(200);
    });

    it('debería devolver 401 al no haber usuario logueado', async () => {

        const response = await request(app)
            .post('/auth/refresh');

        expect(response.status).toBe(401);
    });

    it('debería devolver 401 al haber expirado el refresh token', async () => {

        const refreshToken = jwt.sign(
            { id: 1 },
            authConfig.refresh_secret,
            { expiresIn: -10 }
        );

        const response = await request(app)
            .post('/auth/refresh')
            .set('Cookie', [`refresh_token=${refreshToken}`]);

        expect(response.status).toBe(401);
    });

    it('debería devolver 401 tener un refresh token invalido', async () => {
        //Se forza un refresh invalido, firmandolo con la firma del access_token
        const refreshToken = jwt.sign(
            { id: 1 },
            authConfig.secret,
            { expiresIn: "24h" }
        );

        const response = await request(app)
            .post('/auth/refresh')
            .set('Cookie', [`refresh_token=${refreshToken}`]);

        expect(response.status).toBe(401);
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });
})