import { TrelloWebhookResponse } from '../model';
import { discord } from '../services/discord';
import { trello } from '../services/trello';

const SUPPORTED_ACTION_TYPES: readonly TrelloWebhookResponse['action']['type'][] = [
    'createCard',
    'updateCard',
];

export const handle = async (trelloResponse: TrelloWebhookResponse) => {
    if (!SUPPORTED_ACTION_TYPES.includes(trelloResponse.action.type)) {
        throw new Error(`Not supported Trello action type:"${trelloResponse.action.type}"`);
    }

    const {
        card: { id: cardId, name },
    } = trelloResponse.action.data;

    const attachments = await trello.getAttachmentsFor({ cardId });

    await discord.publishNews({ title: name, links: attachments?.map((item) => item.url) || [] });
};
