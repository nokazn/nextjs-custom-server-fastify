import fastify from 'fastify';
import Next from 'next';

const server = fastify({
  logger: { level: 'error' },
  pluginTimeout: 0,
});

const port = parseInt(process.env.PORT ?? '0', 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

server.register((fastify, _opts, next) => {
  const app = Next({ dev });
  const handle = app.getRequestHandler();
  app
    .prepare()
    .then(() => {
      if (dev) {
        fastify.get('/_next/*', (req, reply) => {
          return handle(req.raw, reply.raw).then(() => {
            reply.sent = true;
          });
        });
      }

      fastify.get('/a', (req, reply) => {
        // TODO: あとで直す
        // @ts-expect-error
        return app.render(req.raw, reply.raw, '/a', req.query).then(() => {
          reply.sent = true;
        });
      });

      fastify.get('/b', (req, reply) => {
        // TODO: あとで直す
        // @ts-expect-error
        return app.render(req.raw, reply.raw, '/b', req.query).then(() => {
          reply.sent = true;
        });
      });

      fastify.all('/*', (req, reply) => {
        return handle(req.raw, reply.raw).then(() => {
          console.log({ path: req.raw });
          reply.sent = true;
        });
      });

      fastify.setNotFoundHandler((request, reply) => {
        return app.render404(request.raw, reply.raw).then(() => {
          reply.sent = true;
        });
      });

      next();
    })
    .catch((err) => next(err));
});

server.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
