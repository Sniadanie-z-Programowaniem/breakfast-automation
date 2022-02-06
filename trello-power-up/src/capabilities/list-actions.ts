import { Trello } from '../../typings/trello';

const listActions = (mainContext: Trello.PowerUp.IFrame): readonly Trello.PowerUp.ListAction[] => {
    mainContext.get;
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
                });
            },
        },
    ];
};
