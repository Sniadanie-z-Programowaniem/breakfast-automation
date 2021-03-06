import { FastifyPluginAsync } from 'fastify';
import { TrelloWebhookResponse } from './model';
import { environmentConfig } from './common';
import { handle } from './controllers/trello-webhook-handler';

const libs: FastifyPluginAsync = async (fastify) => {
    fastify.register(import('fastify-helmet'));
    fastify.register(import('fastify-sensible'), {
        errorHandler: environmentConfig.environment !== 'development',
    });
};

const routes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/health', async () => ({
        status: 'ok',
    }));

    fastify.head('/trello-webhook-handler', async () => ({
        status: 'ok',
    }));

    fastify.post<{ readonly Body: TrelloWebhookResponse }>(
        '/trello-webhook-handler',
        async (request, reply) => {
            await handle(request.body);

            reply.status(204);
        },
    );
};

export const app: FastifyPluginAsync = async (fastify) => {
    fastify.register(libs);
    fastify.register(routes, { prefix: 'api' });
};

export default app;
