import { environmentConfig, logger } from '../../common';

import axios from 'axios';
import { prepareMessage } from './prepare-message';

export interface DiscordWebhookPayload {
    readonly username: string;
    readonly content: string;
}

const publishNews = async ({
    title,
    links,
}: {
    readonly title: string;
    readonly links: readonly string[];
}) => {
    const { botUserName, newsPublishBotUrl } = environmentConfig.discord;

    const payload: DiscordWebhookPayload = {
        content: prepareMessage({ title, links }),
        username: botUserName,
    };

    try {
        await axios.post<DiscordWebhookPayload>(newsPublishBotUrl, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        logger.error(`Cannot post message on discors. Error:${error}`);
    }
};

export const discord = {
    publishNews,
};
