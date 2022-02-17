import type { ApiResponse, ApiResponseError } from './types';

import { environmentConfig } from '../configuration';

type TrelloListUpdatePatchData = {
    readonly name?: string;
    readonly closed?: boolean;
    readonly idBoard?: string;
    readonly pos?: string | number;
    readonly subscribed?: boolean;
};

const errorResponse = (message: string, error?: Error): ApiResponseError => {
    console.error(message, error?.message);
    return {
        error: message,
        state: 'error',
    };
};

/**
 * Minified vendor library, @link {src/vendor/trello-client.js}
 */
const TrelloClientJs = window.Trello;

export const getTrelloApiService = () => {
    const authorize = (): Promise<void> =>
        new Promise<void>((resolve, reject) => {
            TrelloClientJs.authorize({
                type: 'popup',
                name: environmentConfig.trello.appName,
                scope: {
                    read: true,
                    write: true,
                },
                permanent: true,
                expiration: 'never',
                success: () => resolve(),
                error: (error?: Error) => reject(error),
            });
        });

    const makeCall = async <T>(
        trelloClientCall: (resolve: (data: T) => void, reject: (error: Error) => void) => void,
    ): Promise<ApiResponse<T>> => {
        try {
            await authorize();
            console.log('Successfully authorized to Trello');
        } catch (error) {
            return Promise.resolve(errorResponse(`Cannot authorize to Trello`, error as Error));
        }

        try {
            const result = await new Promise<T>((resolve, reject) =>
                trelloClientCall(resolve, reject),
            );

            return {
                state: 'success',
                data: result,
            };
        } catch (error) {
            return Promise.resolve(errorResponse(`Failed at calling Trello API`, error as Error));
        }
    };

    const lists = {
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

    return {
        lists,
    };
};
