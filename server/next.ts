import Next from 'next';
import type { FastifyPluginCallback } from 'fastify';

import { IS_DEV } from './constants';

/**
 * Next.js の リクエストハンドラーを Fastify に渡す
 */
export const nextRegisterer: FastifyPluginCallback = (fastify, _opts, next) => {
  const app = Next({ dev: IS_DEV });
  const handle = app.getRequestHandler();

  app
    .prepare()
    .then(() => {
      if (IS_DEV) {
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
};
