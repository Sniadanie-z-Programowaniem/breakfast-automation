import { environmentConfig, logger } from './common';

import Fastify from 'fastify';
import pino from 'pino';

const app = Fastify({
    logger: pino({
        level: 'info',
        messageKey: 'message',
        transport: {
            target: 'pino-pretty',
        },
    }),
});

app.register(import('./app'));

app.listen(environmentConfig.standaloneAppPort, (error, address) => {
    if (error) {
        console.error(`Server init failed.`, error);
        process.exit(1);
    }

    logger.info('Server listening at ', address);
});
