import { FastifyPluginAsync } from 'fastify';
import { environmentConfig } from './common';

const libs: FastifyPluginAsync = async (fastify) => {
  fastify.register(import('fastify-helmet'));
  fastify.register(import('fastify-sensible'), {
    errorHandler: false,
  });
};

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/health', async () => ({
    status: 'ok',
  }));

  fastify.get('/config', async () => environmentConfig);
};

export const app: FastifyPluginAsync = async (fastify) => {
  fastify.register(libs);
  fastify.register(routes);
};

export default app;
