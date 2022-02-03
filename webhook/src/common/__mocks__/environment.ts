import { EnvironmentConfig } from '../environment';

export const environmentConfigMock: EnvironmentConfig = {
    APP_NAME: 'Mocked app name',
    VERSION: '1.0.0',
    discord: {
        botUserName: 'Mock bot username',
        newsPublishBotUrl: 'https://example.com/discord-webhook',
    },
    environment: 'development',
    standaloneAppPort: 8080,
};
