import { Trello } from '../../typings/trello';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const listActions = (_: Trello.PowerUp.IFrame): readonly Trello.PowerUp.ListAction[] => {
    return [
        {
            text: 'hello!',
            callback: async (trello) => {
                trello.alert({
                    display: 'success',
                    duration: 3,
                    message: 'It works!',
                });
            },
        },
        {
            text: 'show me popup',
            callback: async (trello) => {
                trello.popup({
                    title: 'Start broadcasting',
                    url: '/broadcast-popup',
                    height: 250,
                });
            },
        },
    ];
};

export const listActionCapabilities = {
    'list-actions': (trello: Trello.PowerUp.IFrame) => listActions(trello),
};
