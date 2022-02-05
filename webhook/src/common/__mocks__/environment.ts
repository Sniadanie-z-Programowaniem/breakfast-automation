import { EnvironmentConfig } from '../environment';

export const environmentConfigMock: EnvironmentConfig = {
    APP_NAME: 'Mocked app name',
    VERSION: '1.0.0',
    discord: {
        botUserName: 'Mock bot username',
        newsPublishBotUrl: 'https://example.com/discord-webhook',
    },
    trello: {
        apiKey: 'my-secret-trello-api-key-123',
        apiToken: 'my-secret-trello-api-token-456',
    },
    environment: 'development',
    standaloneAppPort: 8080,
};
