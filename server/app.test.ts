import { server } from './app';

describe('sample', () => {
  it('requests the "/" route', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/',
    });
    expect(response.statusCode).toEqual(404);
  });

  it('requests the "/pets" route', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/pets',
      query: {
        limit: '30',
        stage: 'gold',
      },
    });
    expect(response.body).toEqual(200);
  });
});
