/**
 * Type definitions for the Trello PowerUp Client v1.20.9
 * Thanks to Angelo Tata for the Trello Types -
 * See https://github.com/tatablack/leaner-coffee-powerup for more info.
 * Available under the Apache-2.0 License
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
export namespace Trello {
    interface PowerUp {
        readonly version: string;
        readonly Promise: PromiseLike<any>;
        readonly CallbackCache: Callback.Cache;
        readonly PostMessageIO: any; // PostMessageIO
        iframe(options?: PowerUp.IFrameOptions): PowerUp.IFrame;
        initialize(
            handlers: PowerUp.CapabilityHandlers,
            options?: PowerUp.PluginOptions,
        ): PowerUp.Plugin | PowerUp.IFrame;
        restApiError(): any;
        readonly util: PowerUp.Util;
    }

    namespace Callback {
        type CacheAction = 'run' | 'retain' | 'release';
        type SerializeResult = (value: any, key?: string) => any;

        type SerializeOutput = {
            readonly _callback: string;
        };

        interface CacheOptions {
            readonly action: CacheAction;
            readonly options: any;
            readonly callback: string;
        }

        interface Cache {
            callback(
                t: PowerUp.IFrame,
                options: CacheOptions,
                serializeResult: SerializeResult,
            ): PromiseLike<any>;
            serialize(fx: (t: PowerUp.IFrame, args: any) => any): SerializeOutput;
            reset(): void;
        }
    }

    namespace PowerUp {
        type ResourceDictionary = {
            readonly [key: string]: string;
        };

        type Colors =
            | 'blue'
            | 'green'
            | 'orange'
            | 'red'
            | 'yellow'
            | 'purple'
            | 'pink'
            | 'sky'
            | 'lime'
            | 'light-gray'
            | 'business-blue';

        type MemberType = 'admin' | 'normal' | 'observer';

        interface Organization {
            readonly id: string;
            readonly name: string;
        }

        interface Label {
            readonly id: string;
            readonly name: string;
            readonly color: Colors;
        }

        interface CustomFieldValue {
            readonly checked?: string;
            readonly date?: string;
            readonly text?: string;
            readonly number?: string;
        }

        interface CustomField {
            readonly id: string;
            readonly idCustomField: string;
            readonly idValue?: string;
            readonly value?: CustomFieldValue;
        }

        interface Member {
            readonly id: string;
            readonly fullName: string | null;
            readonly username: string | null;
            readonly initials: string | null;
            readonly avatar: string | null;
        }

        interface Membership {
            readonly deactivated: boolean;
            readonly id: string;
            readonly idMember: string;
            readonly memberType: MemberType;
            readonly unconfirmed: boolean;
        }

        interface Preview {
            readonly bytes: number;
            readonly height: number;
            readonly scaled: boolean;
            readonly url: string;
            readonly width: number;
        }

        interface AttachmentSectionBase {
            readonly claimed: boolean;
            readonly icon: string;
            readonly content: {
                readonly type: string;
                readonly url: string;
                readonly height?: number;
            };
        }

        interface AttachmentsByType {
            readonly [key: string]: {
                readonly board: number;
                readonly card: number;
            };
        }

        interface Attachment {
            readonly date: string;
            readonly edgeColor: string;
            readonly id: string;
            readonly idMember: string;
            readonly name: string;
            readonly previews: readonly Preview[];
            readonly url: string;
        }

        interface AttachmentSection extends AttachmentSectionBase {
            readonly title: string;
        }

        interface LazyAttachmentSection extends AttachmentSectionBase {
            readonly id: string;
            title(): string;
        }

        interface Coordinates {
            readonly latitude: number;
            readonly longitude: number;
        }

        interface BadgesInfo {
            readonly attachments: number;
            readonly attachmentsByType: AttachmentsByType;
            readonly checkItems: number;
            readonly checkItemsChecked: number;
            readonly comments: number;
            readonly description: boolean;
            readonly due: string; // timestamp
            readonly dueComplete: boolean;
            readonly fogbugz: string;
            readonly location: boolean;
            readonly subscribed: boolean;
            readonly viewingMemberVoted: boolean;
            readonly votes: number;
        }

        interface Board {
            readonly id: string;
            readonly name: string;
            readonly url: string; // https://trello.com/c/I5nAdteE/9-test
            readonly shortLink: string;
            readonly members: readonly Member[];
            readonly dateLastActivity: string; // "2019-11-28T15:53:19.709Z"
            readonly idOrganization: string;
            readonly customFields: readonly CustomField[];
            readonly labels: readonly Label[];
            readonly memberships: readonly Membership[];
        }

        interface Card {
            readonly address: string | null;
            readonly attachments: readonly Attachment[];
            readonly badges: BadgesInfo;
            readonly closed: boolean;
            readonly coordinates: Coordinates | null;
            readonly cover: Attachment | null;
            readonly customFieldItems: readonly CustomField[];
            readonly dateLastActivity: string; // "2019-11-28T15:53:19.709Z"
            readonly desc: string;
            readonly due: string | null; // "2019-11-28T15:53:19.709Z"
            readonly dueComplete: boolean;
            readonly id: string;
            readonly idList: string;
            readonly idShort: number;
            readonly labels: readonly Label[];
            readonly locationName: string | null;
            readonly members: readonly Member[];
            readonly name: string;
            readonly pos: number;
            readonly shortLink: string;
            readonly url: string; // https://trello.com/c/I5nAdteE/9-test
        }

        interface List {
            readonly id: string;
            readonly name: string;
            readonly cards: readonly Card[];
        }

        type OrganizationFields = keyof Organization;
        type BoardFields = keyof Board;
        type CardFields = keyof Card;
        type ListFields = keyof List;
        type MemberFields = keyof Member;

        type Condition = 'admin' | 'always' | 'edit' | 'readonly' | 'signedIn' | 'signedOut';

        interface BoardButtonBase {
            readonly icon: {
                readonly dark: string;
                readonly light: string;
            };
            readonly text: string;
            readonly condition?: Condition;
        }

        interface BoardButtonCallback extends BoardButtonBase {
            readonly callback: (t: Trello.PowerUp.IFrame) => PromiseLike<void>;
        }

        interface BoardButtonUrl extends BoardButtonBase {
            readonly url: string;
            readonly target?: string;
        }

        interface CardBackSection {
            readonly title: string;
            readonly icon: string;
            readonly content: {
                readonly type: 'iframe';
                readonly url: string;
                readonly height?: number;
            };
        }

        interface CardBadge {
            readonly text?: string;
            readonly icon?: string;
            readonly color?: Colors;
            readonly refresh?: number;
        }

        interface CardBadgeDynamic {
            dynamic(): CardBadge;
        }

        interface CardButton {
            readonly icon: string;
            readonly text: string;
            readonly condition?: Condition;
            callback(t: Trello.PowerUp.IFrame): PromiseLike<void>;
            readonly url?: string;
            readonly target?: string;
        }

        interface CardDetailBadge extends CardBadge {
            readonly title: string;
            callback?(t: PowerUp.IFrame): void;
            readonly url?: string;
            readonly target?: string;
        }

        interface CardDetailBadgeDynamic {
            dynamic(): CardDetailBadge;
        }

        interface ListAction {
            readonly text: string;
            callback(t: PowerUp.IFrame): PromiseLike<void>;
        }

        interface ListSorter {
            readonly text: string;
            callback(
                t: PowerUp.IFrame,
                options: {
                    readonly cards: readonly Card[];
                },
            ): PromiseLike<{ readonly sortedIds: readonly string[] }>;
        }

        type CapabilityHandlers = {
            readonly 'attachment-sections'?: (
                t: PowerUp.IFrame,
                options: {
                    readonly entries: readonly Attachment[];
                },
            ) => PromiseLike<readonly (AttachmentSection | LazyAttachmentSection)[]>;
            readonly 'attachment-thumbnail'?: () => void;
            readonly 'board-buttons'?: (
                t: PowerUp.IFrame,
            ) => PromiseLike<readonly (BoardButtonUrl | BoardButtonCallback)[]>;
            readonly 'card-back-section'?: (t: PowerUp.IFrame) => PromiseLike<CardBackSection>;
            readonly 'card-badges'?: (
                t: PowerUp.IFrame,
            ) => PromiseLike<readonly (CardBadgeDynamic | CardBadge)[]>;
            readonly 'card-buttons'?: (t: PowerUp.IFrame) => PromiseLike<readonly CardButton[]>;
            readonly 'card-detail-badges'?: (
                t: PowerUp.IFrame,
            ) => PromiseLike<readonly (CardDetailBadgeDynamic | CardDetailBadge)[]>;
            readonly 'card-from-url'?: () => void;
            readonly 'format-url'?: () => void;
            readonly 'list-actions'?: (
                t: PowerUp.IFrame,
            ) => readonly ListAction[] | PromiseLike<readonly ListAction[]>;
            readonly 'list-sorters'?: (t: PowerUp.IFrame) => PromiseLike<readonly ListSorter[]>;
            readonly 'on-enable'?: (t: PowerUp.IFrame) => PromiseLike<void>;
            readonly 'on-disable'?: () => void;
            readonly 'remove-data'?: () => void;
            readonly 'show-settings'?: (t: PowerUp.IFrame) => PromiseLike<void>;
            readonly 'authorization-status'?: () => void;
            readonly 'show-authorization'?: () => void;
        };

        type Model = 'board' | 'card' | 'organization';
        type Scope = Model | 'member';
        type Permissions = 'read' | 'write';

        type Visibility = 'shared' | 'private';

        interface PopupOptionsItem {
            readonly text: string;
            callback?(t: any, options: any): PromiseLike<void>;
        }

        interface PopupOptions {
            readonly title: string;
            readonly items: readonly PopupOptionsItem[];
            readonly mouseEvent?: MouseEvent;
        }

        interface PopupSearchOptions extends PopupOptions {
            readonly search: {
                readonly count?: number;
                readonly placeholder?: string;
                readonly empty?: string;
                readonly searching?: string;
                readonly debounce?: number;
            };
        }

        interface PopupIframeOptions {
            callback?(t: PowerUp.IFrame, options: { readonly locale: string }): void;
            readonly title: string;
            readonly url: string;
            readonly args?: {
                readonly [key: string]: any;
            };
            readonly height?: number;
            readonly mouseEvent?: MouseEvent;
        }

        interface PopupDateOptions {
            readonly type: 'date' | 'datetime';
            readonly title: string;
            callback(
                t: PowerUp.IFrame,
                options: {
                    readonly date: string;
                },
            ): PromiseLike<void>;
            readonly date?: Date;
            readonly minDate?: Date;
            readonly maxDate?: Date;
            readonly mouseEvent?: MouseEvent;
        }

        interface PopupConfirmOptions {
            readonly type: 'confirm';
            readonly title: string;
            readonly message: string;
            readonly confirmText: string;
            onConfirm(t: PowerUp.IFrame, opts: any): PromiseLike<void>;
            readonly confirmStyle?: 'primary' | 'danger';
            readonly mouseEvent?: MouseEvent;
        }

        interface PopupConfirmWithCancelOptions extends PopupConfirmOptions {
            readonly cancelText: string;
            onCancel(t: PowerUp.IFrame, opts: any): PromiseLike<void>;
        }

        interface HeaderAction {
            readonly icon: string;
            readonly alt: string;
            callback(): void;
            readonly position: 'left' | 'right';
            readonly url?: string;
        }

        type AlertDisplay = 'info' | 'warning' | 'error' | 'success';

        // INTERNAL INTERFACES
        interface Localizer {
            readonly resourceDictionary: ResourceDictionary;
            localize(key: string, args: readonly string[]): string;
        }

        interface Localization {
            readonly defaultLocale: string;
            readonly supportedLocales: readonly string[];
            readonly resourceUrl: string;
        }

        interface LocalizerOptions {
            readonly localizer?: Localizer;
            loadLocalizer?(): PromiseLike<Localizer>;
            readonly localization?: Localization;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        interface Util {
            readonly color: {
                getHexString(): string;
                namedColorStringToHex(): string;
            };

            readonly convert: {
                bytesToHexString(): string;
                hexStringToUint8Array(): any;
            };

            readonly crypto: {
                decryptSecret(): any;
                encryptSecret(): any;
                exportAESCBCKeyToRaw(): any;
                generateAESCBCKey(): any;
                generateInitVector(): any;
                importAESCBCKeyFromRaw(): any;
                sha256Digest(): any;
            };

            initLocalizer(locale: string, options: LocalizerOptions): PromiseLike<void>;
            makeErrorEnum(): Error;
            relativeUrl(url: string): string;
        }

        interface AnonymousHostHandlers {
            requestWithContext(command: string, options: any): PromiseLike<any>;
            getAll(): PromiseLike<any>;
            get(
                scope: Scope | string,
                visibility: Visibility,
                key?: string,
                defaultValue?: any,
            ): PromiseLike<any>;
            set(
                scope: Scope | string,
                visibility: Visibility,
                key: string,
                defaultValue?: any,
            ): PromiseLike<void>;
            set(
                scope: Scope | string,
                visibility: Visibility,
                entries: {
                    readonly [key: string]: any;
                },
            ): PromiseLike<void>;
            remove(scope: Scope | string, visibility: Visibility, key: string): PromiseLike<void>;
            remove(
                scope: Scope | string,
                visibility: Visibility,
                entries: readonly string[],
            ): PromiseLike<void>;
            safe(html: string): string;
            localizeKey(
                key: string,
                data?: {
                    readonly [key: string]: string;
                },
            ): string;
            localizeKeys(keys: readonly [string | readonly string[]]): readonly string[];
            localizeNode(node: Element): void;
            board(...fields: readonly ['all'] | readonly BoardFields[]): PromiseLike<Board>;
            cards(
                ...fields: readonly ['all'] | readonly CardFields[]
            ): PromiseLike<readonly Card[]>;
            lists(
                ...fields: readonly ['all'] | readonly ListFields[]
            ): PromiseLike<readonly List[]>;
            member(...fields: readonly ['all'] | readonly MemberFields[]): PromiseLike<Member>;
            organization(
                ...fields: readonly ['all'] | readonly OrganizationFields[]
            ): PromiseLike<Organization>;
        }

        interface Context {
            readonly board: string;
            readonly card?: string;
            readonly command?: string;
            readonly member: string;
            readonly organization?: string;
            readonly enterprise?: string;
            readonly permissions?: {
                readonly board: Permissions;
                readonly card: Permissions;
                readonly organization: Permissions;
            };
            readonly version: string;
        }

        interface HostHandlers extends AnonymousHostHandlers {
            getContext(): Context;
            isMemberSignedIn(): boolean;
            memberCanWriteToModel(modelType: Model): boolean;
            arg(name: string, defaultValue?: any): any;
            signUrl(url: string, args?: { readonly [key: string]: any }): string;
            navigate(options: { readonly url: string }): any;
            showCard(idCard: string): PromiseLike<void>;
            hideCard(): PromiseLike<void>;
            alert(options: {
                readonly message: string;
                readonly duration?: number;
                readonly display?: AlertDisplay;
            }): PromiseLike<void>;
            hideAlert(): PromiseLike<void>;
            popup(
                options:
                    | PopupOptions
                    | PopupSearchOptions
                    | PopupIframeOptions
                    | PopupDateOptions
                    | PopupConfirmOptions
                    | PopupConfirmWithCancelOptions,
            ): PromiseLike<void>;
            overlay(options: {
                readonly url: string;
                readonly args: { readonly [key: string]: any };
                readonly inset: unknown;
            }): PromiseLike<void>;
            boardBar(options: {
                readonly url: string;
                readonly args?: { readonly [key: string]: any };
                readonly height?: number;
                readonly accentColor?: string | Colors;
                callback?(t: PowerUp.IFrame): void;
                readonly title?: string;
                readonly actions?: readonly HeaderAction[];
                readonly resizable?: boolean;
            }): PromiseLike<void>;
            modal(options: {
                readonly url: string;
                readonly accentColor?: string | Colors;
                readonly height?: number;
                readonly fullscreen?: boolean;
                callback?(): void;
                readonly title?: string;
                readonly actions?: readonly HeaderAction[];
                readonly args?: { readonly [key: string]: any };
            }): PromiseLike<void>;
            updateModal(options: {
                readonly accentColor?: string | Colors;
                readonly actions?: readonly HeaderAction[];
                readonly fullscreen?: boolean;
                readonly title?: string;
            }): PromiseLike<void>;
            closePopup(): PromiseLike<void>;
            back(): PromiseLike<void>;
            hideOverlay(): PromiseLike<void>;
            closeOverlay(options?: { readonly inset?: unknown }): PromiseLike<void>;
            hideBoardBar(): PromiseLike<void>;
            closeBoardBar(): PromiseLike<void>;
            closeModal(): PromiseLike<void>;
            sizeTo(arg: string | number | Element): PromiseLike<void>;
            card(...fields: readonly ['all'] | readonly CardFields[]): PromiseLike<Card>;
            list(...fields: readonly ['all'] | readonly ListFields[]): PromiseLike<List>;
            attach(data: { readonly name: string; readonly url: string }): PromiseLike<void>;
            requestToken(options: unknown): PromiseLike<string>;
            authorize(
                authUrl: string,
                options?: {
                    readonly height?: number;
                    readonly width?: number;
                    validToken?(value: string): boolean;
                },
            ): PromiseLike<string>;
            storeSecret(secretKey: string, secretData: string): PromiseLike<void>;
            loadSecret(secretKey: string): PromiseLike<string>;
            clearSecret(secretKey: string): PromiseLike<void>;
            notifyParent(
                message: 'done',
                options?: {
                    readonly targetOrigin: string;
                },
            ): PromiseLike<void>;
        }

        interface IFrameOptions extends LocalizerOptions {
            readonly appKey?: string;
            readonly appName?: string;
            readonly context?: string;
            readonly secret?: string;
            readonly helpfulStacks?: boolean;
        }

        interface IFrame extends HostHandlers {
            readonly io: any | null;
            readonly args: readonly any[];
            readonly secret?: string;
            readonly options: IFrameOptions;
            readonly i18nPromise: PromiseLike<void>;
            init(): any;
            connect(): void;
            request(command: string, options: any): PromiseLike<any>;
            render(fxRender: () => void): any;
            initApi(): void;
            getRestApi(): unknown;
            initSentry(): void;
        }

        interface PluginOptions extends LocalizerOptions {
            readonly Sentry?: {
                configureScope(
                    callback: (scope: {
                        setTags(name: string, value: string): void;
                        setUser(value: { readonly id: string }): void;
                    }) => void,
                ): void;
            };
            readonly appKey?: string;
            readonly appName?: string;
            readonly apiOrigin?: string;
            readonly authOrigin?: string;
            readonly localStorage?: Storage;
            readonly tokenStorageKey?: string;
            readonly helpfulStacks?: boolean;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        interface Plugin extends AnonymousHostHandlers {
            readonly options: PluginOptions;
            connect(): any; // return an instance of PostMessageIO
            request(command: string, options: any): PromiseLike<any>; //  // return PostMessageIO.request, whatever that is
            init(): any; // return an instance of PostMessageIO
            NotHandled(): any; // return PostMessageIO.NotHandled, whatever that is
        }
    }
}

declare global {
    interface Window {
        readonly TrelloPowerUp: Trello.PowerUp;
        readonly locale: string;
    }
}
