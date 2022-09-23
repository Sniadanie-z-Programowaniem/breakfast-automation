import type { ApiResponse, ApiResponseError } from './types';

import { environmentConfig } from '../configuration';
import { iframeInstance } from '../power-up';

type TrelloListUpdatePatchData = {
    readonly name?: string;
    readonly closed?: boolean;
    readonly idBoard?: string;
    readonly pos?: string | number;
    readonly subscribed?: boolean;
};

/**
 * Minified vendor library, @link {src/vendor/trello-client.js}
 */
const TrelloClientJs = window.Trello;

const errorResponse = (message: string, error?: Error): ApiResponseError => {
    console.error(message, error?.message);
    return {
        error: message,
        state: 'error',
    };
};

const authorize = async (showPopup = false): Promise<void> => {
    const KEY = 'api-token';

    const previousToken = await iframeInstance().loadSecret(KEY);
    TrelloClientJs.setToken(previousToken);

    return new Promise<void>((resolve, reject) => {
        TrelloClientJs.authorize({
            type: 'popup',
            name: environmentConfig.trello.appName,
            scope: {
                read: true,
                write: true,
            },
            permanent: true,
            interactive: showPopup,
            expiration: 'never',
            success: () => {
                if (!previousToken) {
                    iframeInstance().storeSecret(KEY, TrelloClientJs.token() ?? '');
                }
                resolve();
            },
            error: (error?: Error) => reject(error),
        });
    });
};

const makeCall = async <T>(
    trelloClientCall: (resolve: (data: T) => void, reject: (error: Error) => void) => void,
): Promise<ApiResponse<T>> => {
    try {
        await authorize();
    } catch (error) {
        try {
            await authorize(true);
        } catch (error) {
            return Promise.resolve(errorResponse(`Cannot authorize to Trello`, error as Error));
        }
    }

    try {
        const result = await new Promise<T>((resolve, reject) => trelloClientCall(resolve, reject));

        return {
            state: 'success',
            data: result,
        };
    } catch (error) {
        return Promise.resolve(errorResponse(`Failed at calling Trello API`, error as Error));
    }
};

const listsResource = {
    update: (listId: string, patchData: TrelloListUpdatePatchData): Promise<ApiResponse> =>
        makeCall((resolve, reject) =>
            TrelloClientJs.put<ApiResponse, TrelloListUpdatePatchData>(
                `lists/${listId}`,
                patchData,
                resolve,
                reject,
            ),
        ),
};

export const trelloApiService = {
    lists: listsResource,
};
