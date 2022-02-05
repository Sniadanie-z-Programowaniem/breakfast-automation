import 'dotenv/config';

import { logger } from './logger';

logger.info('Loaded dotenv config');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageMeta = require('../../package.json');

export type EnvironmentConfig = {
    readonly VERSION: string;
    readonly APP_NAME: string;
    readonly standaloneAppPort: number;
    readonly environment: Exclude<NodeJS.ProcessEnv['NODE_ENV'], undefined>;
    readonly discord: {
        readonly botUserName: string;
        readonly newsPublishBotUrl: string;
    };
    readonly trello: {
        readonly apiKey: string;
        readonly apiToken: string;
    };
};

export const environmentConfig: EnvironmentConfig = ((): EnvironmentConfig => {
    const standaloneAppPort = process.env['STANDALONE_APP_PORT'];

    return {
        VERSION: packageMeta.version,
        APP_NAME: packageMeta.name,
        standaloneAppPort: standaloneAppPort ? +standaloneAppPort : 8080,
        environment: process.env['NODE_ENV'] || 'development',
        // todo add proper validation of env variables
        discord: {
            botUserName: 'Śniadanie z Programowaniem bot',
            newsPublishBotUrl: process.env['DISCORD_NEWS_PUBLISH_BOT_URL'] || '',
        },
        // todo add proper validation of env variables
        trello: {
            apiKey: process.env['TRELLO_API_KEY'] || '',
            apiToken: process.env['TRELLO_API_TOKEN'] || '',
        },
    };
})();
