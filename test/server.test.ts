import request from 'supertest';
import { app } from '../src/server.ts';

describe('Servidor', () => {
  it('debería responder correctamente', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'API de Tienda',
    });
  });
});

// /auth
  // POST /auth/refresh
  // POST /auth/register
  // POST /auth/login
  // POST /auth/logout

// /productos
  // GET /productos
  // POST /productos
  // GET /productos:id
  // PUT /productos:id
  // DELETE /productos:id
  
// /usuarios
  // GET /usuarios
  // POST /usuarios
  // GET /usuarios:id
  // PUT /usuarios:id
  // DELETE /usuarios:id

// /ordenes
  // GET /ordenes
  // POST /ordenes
  // GET /ordenes:id
  // PUT /ordenes:id
  // DELETE /ordenes:id 

  // GET /ordenes/:ordenId/products/:ordenProductoI
  // GET /ordenes/:ordenId/products
  // PUT /ordenes/:ordenId/products
  // DELETE /ordenes/:ordenId/products/:ordenProductoId
  // POST /ordenes/:ordenId/products

  