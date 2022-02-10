export type EnvironmentConfig = {
    readonly trello: {
        readonly appKey: string;
        readonly appName: string;
    };
};

export const environmentConfig: EnvironmentConfig = {
    trello: {
        appKey: import.meta.env.VITE_TRELLO_API_KEY,
        appName: import.meta.env.VITE_TRELLO_APP_NAME,
    },
};
