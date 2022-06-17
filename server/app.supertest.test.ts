import { server } from './app';
import supertest from 'supertest';

describe('sample2', () => {
  beforeAll(async () => {
    await server.ready();
  });

  afterAll(() => {
    server.close();
  });

  it('requests the "/" route', async () => {
    const response = await supertest(server.server).get('/').expect(404);
    expect(response.body.message).toMatch(/not found/i);
  });

  it('requests the "/pets" route', async () => {
    const response = await supertest(server.server)
      .get('/pets')
      .query({
        limit: '30',
        stage: 'gold',
      })
      .expect(200);
    expect(response.body).toStrictEqual({
      a: 1,
      b: 2,
      c: 3,
    });
  });
});
