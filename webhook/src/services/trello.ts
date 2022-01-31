import { TrelloAttachment } from '../model';

const getAttachmentsFor = async ({
    cardId,
}: {
    readonly cardId: string;
}): Promise<readonly TrelloAttachment[] | undefined> => {
    console.log('Mocked: Fetch trello attachement for ', cardId);

    return [
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
};

export const trello = {
    getAttachmentsFor,
};
