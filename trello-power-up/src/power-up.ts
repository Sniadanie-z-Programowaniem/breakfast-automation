import { Trello } from '../typings/trello';
import { environmentConfig } from './configuration';

/**
 * When called as Web API callback, we have to instantiate new iFrame helper object
 * from trello. If not - we're getting CORS error.
 */
export const iframeInstance = (): Trello.PowerUp.IFrame => {
    const { appKey, appName } = environmentConfig.trello;

    return window.TrelloPowerUp.iframe({
        appKey,
        appName,
    });
};
