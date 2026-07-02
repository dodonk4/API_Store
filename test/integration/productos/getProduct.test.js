import { jest } from '@jest/globals';
import {app} from '../../../src/server.ts'
import request from 'supertest';
import * as productosService from '../../../src/services/productos.service.ts';

let getProductByIdController;

describe('GET /productos/:productoId', () => {

  it('debería devolver un producto por su id', async () => {

    let productoId = 1;
    
    const response = await request(app)
      .get(`/productos/${productoId}`);


    expect(response.status).toBe(200);
  });
});
