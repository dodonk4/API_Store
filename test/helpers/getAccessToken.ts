import request from 'supertest';
import { app } from '../../src/app.ts';

export async function getAdminAgent() {

  const agent = request.agent(app);

  const credentials = {
    email: 'maria@example.com',
    password: 'abcd1234'
  };

  const login = await agent
    .post('/auth/login')
    .send(credentials)
    .expect(200);

  return agent;
}

export async function getUserAgent() {

  const agent = request.agent(app);

  const credentials = {
    email: 'juan@example.com',
    password: 'abcd1234'
  };

  const login = await agent
    .post('/auth/login')
    .send(credentials)
    .expect(200);

  return agent;
}

export async function getNonAuthenticatedAgent() {

  const agent = request.agent(app);

  const credentials = {
    email: 'juan@example.com',
    password: 'abcd1234'
  };

  const login = await agent
    .post('/auth/login')
    .send(credentials)
    .expect(200);

  return agent;
}