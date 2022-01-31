import { environmentConfig } from '../common';
import got from 'got';

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

const publishNews = ({
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

    got.post(newsPublishBotUrl, {
        body: JSON.stringify(payload),
    });
};

export const discord = {
    publishNews,
};
