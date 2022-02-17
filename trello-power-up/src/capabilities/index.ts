import { Trello } from '../../typings/trello';
import { listActionCapabilities } from './list-actions';

export const initializePowerUpWithCapabilities = ():
    | Trello.PowerUp.Plugin
    | Trello.PowerUp.IFrame =>
    window.TrelloPowerUp.initialize({
        ...listActionCapabilities,
    });
