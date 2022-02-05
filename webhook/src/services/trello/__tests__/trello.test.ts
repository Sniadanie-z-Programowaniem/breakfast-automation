import { TrelloAttachment } from '../../../model';
import nock from 'nock';
import { trello } from '../index';

jest.mock('../../../common', () => ({
    ...jest.requireActual('../../../common'),
    environmentConfig: {
        trello: {
            apiKey: 'my-secret-trello-api-key-123',
            apiToken: 'my-secret-trello-api-token-456',
        },
    },
}));

describe('trello', () => {
    beforeEach(() => {
        if (!nock.isActive()) {
            nock.activate();
        }
    });

    afterEach(() => {
        nock.restore();
    });

    describe('getAttachmentsFor', () => {
        it('should get attachment for given card', async () => {
            const trelloResponse: readonly TrelloAttachment[] = [
                {
                    id: '61f6d592d187731dba4aa3ab',
                    bytes: null,
                    date: new Date('2022-01-30T18:14:42.883Z'),
                    edgeColor: null,
                    idMember: '535cf8368dc52b411e319bcc',
                    isUpload: false,
                    mimeType: '',
                    name: 'https://vitejs.dev/guide/#scaffolding-your-first-vite-project',
                    previews: [],
                    url: 'https://vitejs.dev/guide/#scaffolding-your-first-vite-project',
                    pos: 16384,
                    fileName: null,
                },
            ];

            const cardId = 'bdccfcf4-b357-472d-9997-ca33a44191f7';

            const actualHttpCall = nock(`https://api.trello.com/1`)
                .get(
                    '/cards/bdccfcf4-b357-472d-9997-ca33a44191f7/attachments?key=my-secret-trello-api-key-123&token=my-secret-trello-api-token-456',
                )
                .reply(200, trelloResponse);

            await expect(trello.getAttachmentsFor({ cardId })).resolves.not.toThrowError();

            actualHttpCall.done();
        });
    });

    test.each([[400], [401], [500]])(
        'should return empty array if %p status returned',
        async (returnedStatus: number) => {
            const cardId = 'bdccfcf4-b357-472d-9997-ca33a44191f7';

            const actualHttpCall = nock(`https://api.trello.com/1`)
                .get(
                    '/cards/bdccfcf4-b357-472d-9997-ca33a44191f7/attachments?key=my-secret-trello-api-key-123&token=my-secret-trello-api-token-456',
                )
                .reply(returnedStatus);

            const actual = await trello.getAttachmentsFor({ cardId });
            expect(actual).toEqual([]);

            actualHttpCall.done();
        },
    );
});
