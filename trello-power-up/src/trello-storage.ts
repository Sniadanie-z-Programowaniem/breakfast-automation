import { Ref, ref } from 'vue';

import { EpisodeBroadcast } from './components/broadcastPopup/types';
import { Trello } from '../typings/trello';
import { iframeInstance } from './power-up';

const STORAGE_KEY = 'BREAKFAST_EPISODE';

const get = (trello: Trello.PowerUp.IFrame = iframeInstance()): Promise<EpisodeBroadcast | null> =>
    trello.get('board', 'shared', STORAGE_KEY) as Promise<EpisodeBroadcast>;

const set = (
    value: EpisodeBroadcast | null,
    trello: Trello.PowerUp.IFrame = iframeInstance(),
): Promise<void> => trello.set('board', 'shared', STORAGE_KEY, value) as Promise<void>;

const episode = ref<EpisodeBroadcast | null>(null);

export const episodeStorage = (trello: Trello.PowerUp.IFrame) => ({
    get: () => get(trello),
    set: (value: EpisodeBroadcast | null) => set(value, trello),
});

export default function useStoredEpisode(): {
    readonly episode: Ref<EpisodeBroadcast | null>;
    readonly set: (value: EpisodeBroadcast | null, trello?: Trello.PowerUp.IFrame) => void;
} {
    get().then((storedEpisode) => {
        episode.value = storedEpisode;
    });

    return {
        episode,
        set: async (value) => {
            episode.value = value;
            return set(value);
        },
    };
}
