const SMALL_TALK_PROMPTS = [
    'Właśnie rozmawiamy o',
    'Na talerz wiechało',
    'Jak ciastko do kawy wpadło',
    'A teraz coś z innej filiżanki:',
    'Kolejny news',
    'Rzućmy okiem na',
    'News news!',
] as const;

const EMOJI_INDICATORS = ['☕️', '👉', '🗞', '📰', '🚨', '🎙', '🤨', '🍳', '🍞', '🧀', '🥪'] as const;

type ArrayWithAtLeastOneElement<T> = readonly [T, ...(readonly T[])];
const randomItemFrom = <T>(array: ArrayWithAtLeastOneElement<T>): T =>
    array[(array.length * Math.random()) | 0] || array[0];

export const getSmallTalkPrompt = (): string => randomItemFrom(SMALL_TALK_PROMPTS);
export const getEmojiIndicator = (): string => randomItemFrom(EMOJI_INDICATORS);
