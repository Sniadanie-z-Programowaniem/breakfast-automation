export interface TrelloWebhookResponse {
    readonly model: Model;
    readonly action: Action;
}

export interface Action {
    readonly id: string;
    readonly idMemberCreator: string;
    readonly data: Data;
    /**
     * There is much more action types: https://developer.atlassian.com/cloud/trello/guides/rest-api/action-types/
     */
    readonly type: 'createCard' | 'createList' | 'updateBoard' | 'updateCard';
    readonly date: Date;
    readonly appCreator: null;
    readonly limits: Limits;
    readonly display: Display;
    readonly memberCreator: MemberCreator;
}

export interface Data {
    readonly card: DataCard;
    readonly old: Old;
    readonly board: Board;
    readonly listBefore: List;
    readonly listAfter: List;
}

export interface Board {
    readonly id: string;
    readonly name: string;
    readonly shortLink: string;
}

export interface DataCard {
    readonly idList: string;
    readonly id: string;
    readonly name: string;
    readonly idShort: number;
    readonly shortLink: string;
}

export interface List {
    readonly id: string;
    readonly name: string;
}

export interface Old {
    readonly idList: string;
}

export interface Display {
    readonly translationKey: string;
    readonly entities: Entities;
}

export interface Entities {
    readonly card: EntitiesCard;
    readonly listBefore: ListAfter;
    readonly listAfter: ListAfter;
    readonly memberCreator: ListAfter;
}

export interface EntitiesCard {
    readonly type: string;
    readonly idList: string;
    readonly id: string;
    readonly shortLink: string;
    readonly text: string;
}

export interface ListAfter {
    readonly type: string;
    readonly id: string;
    readonly text: string;
    readonly username?: string;
}

export type Limits = unknown;

export interface MemberCreator {
    readonly id: string;
    readonly activityBlocked: boolean;
    readonly avatarHash: string;
    readonly avatarURL: string;
    readonly fullName: string;
    readonly idMemberReferrer: null;
    readonly initials: string;
    readonly nonPublic: Limits;
    readonly nonPublicAvailable: boolean;
    readonly username: string;
}

export interface Model {
    readonly id: string;
    readonly name: string;
    readonly closed: boolean;
    readonly pos: number;
    readonly idBoard: string;
}
