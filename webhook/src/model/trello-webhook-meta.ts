export interface TrelloWebhookMeta {
    readonly id: string;
    readonly description: string;
    readonly idModel: string;
    readonly callbackURL: string;
    readonly active: boolean;
    readonly consecutiveFailures: number;
    readonly firstConsecutiveFailDate: null;
}
