import { environmentConfig, logger } from '../../common';
import { getEmojiIndicator, getSmallTalkPrompt } from './prompts';

import axios from 'axios';

interface DiscordWebhookPayload {
    readonly username: string;
    readonly content: string;
}

const prepareMessage = ({
    title,
    links,
}: {
    readonly title: string;
    readonly links: readonly string[];
}) => {
    const prompt = getSmallTalkPrompt();
    const emoji = getEmojiIndicator();

    const displayLinks = links.length ? '\n' + links.map((link) => `\n* ${link}`) : '';

    // yeah, it is cheesy that server handles that not client :badpockerface:
    const now = new Intl.DateTimeFormat('pl-PL', { dateStyle: 'full', timeStyle: 'short' }).format(
        new Date(),
    );

    return `${emoji} ${now} | ${prompt} **${title}**${displayLinks}`;
};

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

    logger.info('URL:', newsPublishBotUrl);

    try {
        await axios.post<DiscordWebhookPayload>(newsPublishBotUrl, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        logger.error(error);
    }
};

export const discord = {
    publishNews,
};
