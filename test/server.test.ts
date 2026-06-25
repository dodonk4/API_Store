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