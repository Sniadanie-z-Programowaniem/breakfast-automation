import { environmentConfig, logger } from '../common';

import axios from 'axios';

interface DiscordWebhookPayload {
    readonly username: string;
    readonly content: string;
}

const SmallTalkPrompts: ReadonlyArray<string> = [
    'Właśnie rozmawiamy o',
    'Na talerz wiechało',
    'Jak ciastko do kawy',
    'A teraz coś z innej filiżanki',
    'Kolejny news',
    'Rzućmy okiem na',
];

const prepareMessage = ({
    title,
    links,
}: {
    readonly title: string;
    readonly links: readonly string[];
}) => {
    const prompt = SmallTalkPrompts[(SmallTalkPrompts.length * Math.random()) | 0];
    const displayLinks = links.length ? '\nLinki:' + links.map((link) => `\n* ${link}`) : '';

    return `${prompt}\n**${title}${displayLinks}`;
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
        await axios.post(newsPublishBotUrl, {
            body: JSON.stringify(payload),
        });
    } catch (error) {
        logger.error(error);
    }
};

export const discord = {
    publishNews,
};
