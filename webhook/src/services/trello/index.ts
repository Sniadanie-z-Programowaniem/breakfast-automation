import { environmentConfig, logger } from '../../common';

import { TrelloAttachment } from '../../model';
import axios from 'axios';

const TRELLO_API_BASE_URL = 'https://api.trello.com/1';
const trelloApiUrlFor = (path: string) => new URL(TRELLO_API_BASE_URL + path);

const authHeader = Object.freeze({
    Authorize: `OAuth oauth_consumer_key="${environmentConfig.trello.apiKey}", oauth_token="${environmentConfig.trello.apiToken}"`,
});

const getAttachmentsFor = async ({
    cardId,
}: {
    readonly cardId: string;
}): Promise<readonly TrelloAttachment[]> => {
    try {
        const { data } = await axios.get<readonly TrelloAttachment[]>(
            trelloApiUrlFor(`/cards/${cardId}/attachments`).toString(),
            {
                headers: {
                    ...authHeader,
                },
            },
        );

        return data;
    } catch (error) {
        // todo this sucks - create abstraction which will take error or any payload as second arg
        logger.error(`Cannot fetch trello attachment for cardId=${cardId}. Error:${error}`);
        return [];
    }
};

export const trello = {
    getAttachmentsFor,
};
