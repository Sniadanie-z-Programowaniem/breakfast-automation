import { VercelRequest, VercelResponse } from '@vercel/node';

import Fastify from 'fastify';
import pino from 'pino';

const app = Fastify({
    logger: pino({
        level: 'info',
        messageKey: 'message',
    }),
});

app.register(import('./app'));

export default async (req: VercelRequest, res: VercelResponse) => {
    await app.ready();
    app.server.emit('request', req, res);
};
