import type { ApiResponse, ApiResponseError } from './types';

import { Trello } from '../../typings/trello';
import { environmentConfig } from '../configuration';

const BASE_API = 'https://api.trello.com/1';

type TrelloListUpdatePatchData = {
    readonly name?: string;
    readonly closed?: boolean;
    readonly idBoard?: string;
    readonly pos?: string | number;
    readonly subscribed?: boolean;
};

const errorResponse = (message: string, error: Error): ApiResponseError => {
    console.error(message, error.message);
    return {
        error: message,
        state: 'error',
    };
};

export const getTrelloApiService = (trello: Trello.PowerUp.IFrame) => {
    const { appKey } = environmentConfig.trello;

    const getTokenPromise = () =>
        trello
            .getRestApi()
            .isAuthorized()
            .then((isAuthorized) =>
                isAuthorized ? Promise.resolve() : trello.getRestApi().authorize({ scope: 'read' }),
            )
            .then(() => trello.getRestApi().getToken())
            .then((token) => ({
                token,
                apiOrigin: trello.getRestApi().apiOrigin,
            }));

    const fetchData = async <TData = unknown>({
        path,
        queryParams = {},
    }: {
        readonly path: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        readonly queryParams: Record<string, any> | URLSearchParams;
    }): Promise<ApiResponse<TData>> => {
        let token;
        try {
            token = (await getTokenPromise()).token;
            console.log('token:', token)
            debugger;
        } catch (error) {
            return Promise.resolve(errorResponse(`Cannot retrieve API token`, error));
        }

        const data: TData = await fetch(
            `${BASE_API}/${path}?key=${appKey}&token=${token}&${new URLSearchParams(queryParams)}`,
        ).then((response) => response.json());

        return {
            state: 'success',
            data,
        };
    };

    const lists = {
        update: (listId: string, patchData: TrelloListUpdatePatchData): Promise<ApiResponse> =>
            fetchData({
                path: `lists/${listId}`,
                queryParams: patchData,
            }),
    };

    return {
        lists,
    };
};
