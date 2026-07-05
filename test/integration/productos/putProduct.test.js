import { app } from '../../../src/app.ts';
import request from 'supertest';
import { getAdminAgent, getNonAuthenticatedAgent } from '../../helpers/getAccessToken.ts';
import { badProductoCrear, productoActualizar } from '../../fixtures/productos.fixture.ts';
import { prisma } from '../../../src/lib/prisma.ts';

describe('PUT /productos/:productoId', () => {
    it('debería devolver 200 al actualizar exitosamente un producto', async () => {
        let productoId = 8;

        const agent = await getAdminAgent();
        const response = await agent
            .put(`/productos/${productoId}`)
            .send(productoActualizar);

        expect(response.status).toBe(200);
    })

    
    it('debería devolver 404 al intentar actualizar un producto inexistente', async () => {
        let productoId = 99999;

        const agent = await getAdminAgent();
        const response = await agent
            .put(`/productos/${productoId}`)
            .send(productoActualizar);

        expect(response.status).toBe(404);
    })


    it('debería devolver 400 al intentar actualizar un producto con id invalido', async () => {
        let productoId = "abcdef";

        const agent = await getAdminAgent();
        const response = await agent
            .put(`/productos/${productoId}`)
            .send(productoActualizar);

        expect(response.status).toBe(400);
    })

    it('debería devolver 401 al no encontrar un token', async () => {
        let productoId = 8;

        const response = await request(app)
            .put(`/productos/${productoId}`)
            .send(productoActualizar);

        expect(response.status).toBe(401);
    })

    it('debería devolver 403 al intentar actualizar un producto siendo USER', async () => {
        let productoId = 8;

        const agent = await getNonAuthenticatedAgent();
        const response = await agent
            .put(`/productos/${productoId}`)
            .send(productoActualizar);

        expect(response.status).toBe(403);
    })

    it('debería devolver un error de zod 400 por subir mal los datos a actualizar del producto', async () => {
        const agent = await getAdminAgent();
    
        const res = await agent
          .post('/productos')
          .send(badProductoCrear);//El badProductoCrear sirve también para la actualización mala
    
        expect(res.status).toBe(400);
        
      });

    afterAll(async () => {
        await prisma.$disconnect();
    });
})