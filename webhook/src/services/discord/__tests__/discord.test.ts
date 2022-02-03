import { DiscordWebhookPayload, discord } from '../index';
import nock, { DataMatcherMap } from 'nock';

jest.mock('../../../common', () => ({
    ...jest.requireActual('../../../common'),
    environmentConfig: {
        discord: {
            botUserName: 'Mock bot username',
            newsPublishBotUrl: 'https://example.com/discord-webhook',
        },
    },
}));

jest.mock('../prepare-message', () => ({
    prepareMessage: () => 'Test message prepared to send',
}));

describe('discord', () => {
    beforeEach(() => {
        if (!nock.isActive()) {
            nock.activate();
        }
    });

    afterEach(() => {
        nock.restore();
    });

    describe('publishNews', () => {
        it('should post message to discord webhook', async () => {
            const expectedPayload: DiscordWebhookPayload = {
                content: 'Test message prepared to send',
                username: 'Mock bot username',
            };

            const actualHttpCall = nock('https://example.com/discord-webhook')
                .post('', expectedPayload as any as DataMatcherMap)
                .reply(200);

            await expect(
                discord.publishNews({ title: 'Some title', links: [] }),
            ).resolves.not.toThrowError();

            actualHttpCall.done();
        });
    });
});
