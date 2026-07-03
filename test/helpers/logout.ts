import request from 'supertest';
import { app } from '../../src/app.ts';

export async function logoutHelper() {

  const logout = await request(app)
    .post('/auth/logout');

//   return logout;
}