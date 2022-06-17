import fastify from 'fastify';
import inputValidation from 'openapi-validator-middleware';
import path from 'path';

const server = fastify({
  logger: { level: 'error' },
  pluginTimeout: 0,
});

inputValidation.init(path.join(__dirname, '../docs/openapi/schema.yml'), {
  framework: 'fastify',
});

server.register(inputValidation.validate({}));

server.setErrorHandler(async (err, req, reply) => {
  if (err instanceof inputValidation.InputValidationError) {
    console.error(err);
    return reply.status(400).send({ more_info: err.errors });
  }
  reply.status(500);
  reply.send();
});

server.get('/pets', (req, reply) => {
  reply.status(200).send({
    a: 1,
    b: 2,
    c: 3,
  });
});

server.get('/pets/:petId', (req, reply) => {
  reply.status(204).send();
});

export { server };
