import { getEmojiIndicator, getSmallTalkPrompt } from './prompts';

export const prepareMessage = ({
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
