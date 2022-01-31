import dotenv from 'dotenv';
import { logger } from './logger';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageMeta = require('../../package.json');

export type EnvironmentConfig = {
    readonly VERSION: string;
    readonly APP_NAME: string;
    readonly environment: NodeJS.ProcessEnv['NODE_ENV'];
    readonly discord: {
        readonly botUserName: string;
        readonly newsPublishBotUrl: string;
    };
};

export const environmentConfig: EnvironmentConfig = ((): EnvironmentConfig => {
    dotenv.config();
    logger.info('Loaded dotenv config');

    return {
        VERSION: packageMeta.version,
        APP_NAME: packageMeta.name,
        environment: process.env['NODE_ENV'] || 'development',
        discord: {
            // todo add proper validation of env variables
            botUserName: 'Śniadanie z Programowaniem bot',
            newsPublishBotUrl: process.env['DISCORD_NEWS_PUBLISH_BOT_URL'] || '',
        },
    };
})();
