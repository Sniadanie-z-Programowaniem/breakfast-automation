import { EpisodeBroadcast } from './components/broadcastPopup/types';
import { Trello } from '../typings/trello';
import { iframeInstance } from './power-up';
import { reactive } from 'vue';

const STORAGE_KEY = 'BREAKFAST_EPISODE';

const get = (trello: Trello.PowerUp.IFrame = iframeInstance()): Promise<EpisodeBroadcast | null> =>
    trello.get('board', 'shared', STORAGE_KEY) as Promise<EpisodeBroadcast>;

const set = (value: EpisodeBroadcast | null, trello: Trello.PowerUp.IFrame = iframeInstance()) =>
    trello.set('board', 'shared', STORAGE_KEY, value);

const storedEpisode = (await get()) || null;

const episode = reactive<{ readonly episode: EpisodeBroadcast | null }>({
    episode: storedEpisode,
});

export default function useStoredEpisode(): {
    readonly episode: EpisodeBroadcast | null;
    readonly set: (value: EpisodeBroadcast | null, trello?: Trello.PowerUp.IFrame) => void;
} {
    return {
        episode: episode.episode,
        set,
    };
}
