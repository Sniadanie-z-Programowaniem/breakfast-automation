import { Trello } from '../../typings/trello';
import { episodeStorage } from '../trello-storage';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const listActions = async (
    trello: Trello.PowerUp.IFrame,
): Promise<readonly Trello.PowerUp.ListAction[]> => {
    const episode = await episodeStorage(trello).get();

    const text = episode ? `❌ Stop broadcasting` : '🔴 Start broadcasting';

    return [
        {
            text,
            callback: async (trello) => {
                trello.popup({
                    title: 'Episode broadcasting',
                    url: '/broadcast-popup',
                    height: 320,
                });
            },
        },
    ];
};

export const listActionCapabilities = {
    'list-actions': (trello: Trello.PowerUp.IFrame) => listActions(trello),
};
