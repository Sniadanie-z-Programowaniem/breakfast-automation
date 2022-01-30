import dotenv from 'dotenv';
import { logger } from './logger';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageMeta = require('../../package.json');

export type EnvironmentConfig = {
    VERSION: string;
    APP_NAME: string;
    environment: NodeJS.ProcessEnv['NODE_ENV'];
};

export const environmentConfig: EnvironmentConfig = ((): EnvironmentConfig => {
    dotenv.config();
    logger.info('Loaded dotenv config');

    return {
        VERSION: packageMeta.version,
        APP_NAME: packageMeta.name,
        environment: process.env['NODE_ENV'] || 'development',
    };
})();
