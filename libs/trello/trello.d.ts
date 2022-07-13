declare global {
    interface Window {
        TrelloPowerUp: TrelloPowerUp;
    }
}

declare class TrelloPowerUp {
    static initialize(handlers: Partial<Trello.CapabilityHandlers>, options?: Trello.InitializeOptions): void;
    static iframe(options?: Trello.InitializeOptions): Trello.TrelloIframeApi;
    static restApiError: Trello.RestApiClient.RestApiError;
    static utils: Trello.Utils.Static;
    static Promise: Promise;
}

export declare namespace Trello {
    declare namespace ErrorHandlers {
        interface Api {
            InvalidContext: (message: string) => void;
            NotHandled: (message: string) => void;
            PluginDisabled: (message: string) => void;
        }
    }

    /**
     * docs: https://developer.atlassian.com/cloud/trello/power-ups/client-library/accessing-trello-data/
     */
    declare namespace DataAccessor {
        type TrelloDataAccessor<Options, Result = Options> = (
            ...requestedFields: Array<keyof Options> | ['all']
        ) => PromiseLike<Result>;

        // TODO fill the types
        interface Board {
            id;
            name;
            url;
            shortLink;
            members;
            dateLastActivity;
            idOrganization;
            customFields;
            labels;
            memberships;
        }

        interface List {
            id, name, cards;
        }

        interface Card {
            id, name, desc, due, dueComplete, closed, cover, attachments, members, labels, url, shortLink, idList, idShort, dateLastActivity, badges, customFieldItems, coordinates, address, locationName, pos;
        }

        interface Member {
            id, fullName, username, avatar: any | null, initials;
        }

        interface Organization {
            id, name;
        }

        interface Api {
            board: TrelloDataAccessor<Board>;
            card: TrelloDataAccessor<Card>;
            cards: TrelloDataAccessor<Card, Card[]>;
            list: TrelloDataAccessor<List>;
            lists: TrelloDataAccessor<List, List[]>;
            isMemberSignedIn: () => boolean;
            member: TrelloDataAccessor<Member>;
            memberCanWriteToModel: (model: 'board' | 'card' | 'organization') => boolean;
            organization: TrelloDataAccessor<Organization>;
        }
    }

    /**
     * docs: https://developer.atlassian.com/cloud/trello/power-ups/client-library/getting-and-setting-data/
     */
    declare namespace GetSet {
        type ScopeEntity = 'board' | 'card' | 'member' | 'organization';
        // TODO verify this type
        type Id = `${number}${string}`;
        type Visibility = 'shared' | 'private';

        type VisibilityStore = Partial<Record<Visibility, Record<string, unknown>>>;
        type Store = Partial<Record<ScopeEntity, VisibilityStore>>;

        interface Api<S extends Store> {
            get<
                SKey extends Id,
                VKey extends keyof S['card']
                >(scope: SKey, visibility: VKey): PromiseLike<S['card'][VKey]>
            get<
                SKey extends Id,
                VKey extends keyof S['card'],
                Key extends keyof S['card'][VKey],
                Value extends S['card'][VKey][Key]
                >(scope: SKey, visibility: VKey, key: Key, defaultValue: Value): PromiseLike<Value>
            get<
                SKey extends keyof S,
                VKey extends keyof S[SKey]
                >(scope: SKey, visibility: VKey): PromiseLike<S[SKey][VKey]>
            get<
                SKey extends keyof S,
                VKey extends keyof S[SKey],
                Key extends keyof S[SKey][VKey],
                Value extends S[SKey][VKey][Key]
                >(scope: SKey, visibility: VKey, key: Key, defaultValue?: Value): PromiseLike<Value>
            get<
                SKey extends keyof S,
                VKey extends keyof S[SKey],
                Key extends keyof S[SKey][VKey],
                Value extends S[SKey][VKey][Key]
                >(scope: SKey, visibility: VKey, key?: Key, defaultValue?: Value): PromiseLike<Value | S[SKey][VKey]>;

            getAll: () => PromiseLike<CustomStore>;

            set<
                SKey extends Id,
                VKey extends keyof S['card'],
                Key extends keyof S['card'][VKey],
                Value extends S['card'][VKey][Key]
                >(scope: SKey, visibility: VKey, key: Key, value: Value): PromiseLike<void>;
            set<
                SKey extends Id,
                VKey extends keyof S['card'],
                Key extends keyof S['card'][VKey]
                >(scope: SKey, visibility: VKey, obj: Partial<S['card'][VKey]>): PromiseLike<void>;
            set<
                SKey extends keyof S,
                VKey extends keyof S[SKey],
                Key extends keyof S[SKey][VKey],
                Value extends S[SKey][VKey][Key]
                >(scope: SKey, visibility: VKey, key: Key, value: Value): PromiseLike<void>;
            set<
                SKey extends keyof S,
                VKey extends keyof S[SKey],
                Key extends keyof S[SKey][VKey]
                >(scope: SKey, visibility: VKey, obj: Partial<S[SKey][VKey]>): PromiseLike<void>;
            set<
                SKey extends keyof S,
                VKey extends keyof S[SKey],
                Key extends keyof S[SKey][VKey],
                Value extends S[SKey][VKey][Key]
                >(scope: SKey, visibility: VKey, key: Key | Partial<S[SKey][VKey]>, value?: Value): PromiseLike<void>;

            remove<
                SKey extends Id,
                VKey extends keyof S['card'],
                Key extends keyof S['card'][VKey]
                >(scope: SKey, visibility: VKey, key: Key | Key[]): PromiseLike<void>;
            remove<
                SKey extends keyof S,
                VKey extends keyof S[SKey],
                Key extends keyof S[SKey][VKey]
                >(scope: SKey, visibility: VKey, key: Key | Key[]): PromiseLike<void>;
        }
    }

    /**
     * docs: https://developer.atlassian.com/cloud/trello/power-ups/client-library/managing-secrets/
     */
    declare namespace Secrets {
        interface Api {
            storeSecret: (key: string, data: string) => PromiseLike<void>;
            loadSecret: (key: string) => PromiseLike<void>;
            clearSecret: (key: string) => PromiseLike<void>;
        }
    }

    /**
     * docs: https://developer.atlassian.com/cloud/trello/power-ups/client-library/localization/
     */
    declare namespace Localization {
        // TODO finish localization by URl above
        interface Api {
            localizeKey: any;
            localizeKeys: any;
            localizeNode: any;
        }
    }

    /**
     * docs: https://developer.atlassian.com/cloud/trello/power-ups/client-library/t-arg/
     */
    declare namespace Arg {
        interface Api {
            arg: (name: string, defaultValue: string) => string;
            args: [BaseCallbackOptions]
        }
    }

    /**
     * docs: https://developer.atlassian.com/cloud/trello/power-ups/client-library/t-attach/
     */
    declare namespace Attach {
        interface Options {
            name?: string;
            url: string;
        }

        interface Api {
            attach: (options: Options) => PromiseLike;
        }
    }

    /**
     * docs: https://developer.atlassian.com/cloud/trello/power-ups/client-library/t-authorize/
     */
    declare namespace Authorize {
        interface Options {
            height: number;
            width: number;
            validToken: (token: string) => boolean;
            windowCallback: (authorizeWindow: Window) => void;
        }

        interface Api {
            authorize: (url: string, options: Options) => PromiseLike<string>;
        }
    }

    /**
     * docs: https://developer.atlassian.com/cloud/trello/power-ups/client-library/t-getcontext/
     */
    declare namespace Context {
        interface Data {
            // id of the current board
            board: string,
            // id of the current card (if there is one)
            card: string,
            // capability command, (if there is one)
            command: Capabilities,
            // id of the current member, "notLoggedIn" if no member is logged in
            member: string | 'notLoggedIn',
            // id of the Workspace the board is in (if its in one)
            organization: string,
            // id of the enterprise the board is in (if its in one)
            enterprise: string,
            // read or write permissions for current member per modelType
            permissions: {
                board: 'write' | 'read',
                organization: 'write' | 'read',
                card: 'write' | 'read'
            }
            plugin: string;
            version: string;
        }

        interface Api {
            getContext: () => Data;
        }
    }

    /**
     * docs: https://developer.atlassian.com/cloud/trello/power-ups/client-library/t-jwt/
     */
    declare namespace Jwt {
        interface Api {
            jwt: (options: { state: string }) => PromiseLike<string>;
        }
    }

    /**
     * docs: https://developer.atlassian.com/cloud/trello/power-ups/client-library/t-notifyparent/
     */
    declare namespace NotifyParent {
        interface Api {
            notifyParent: (done: 'done') => PromiseLike<void>;
        }
    }

    /**
     * docs: https://developer.atlassian.com/cloud/trello/power-ups/client-library/t-render/
     */
    declare namespace Render {
        interface Api {
            render: (func: () => void) => void;
        }
    }

    /**
     * docs: https://developer.atlassian.com/cloud/trello/power-ups/client-library/t-signurl/
     */
    declare namespace SignUrl {
        interface Api {
            signUrl: (url: string, args: Record<string, string>) => string;
        }
    }

    /**
     * docs: https://developer.atlassian.com/cloud/trello/power-ups/rest-api-client/
     */
    declare namespace RestApiClient {
        declare namespace Authorize {
            type Scope = 'read' | 'write' | 'account';
            interface Options {
                expiration?: '1hour' | '1day' | '30days' | 'never';
                scope?: Scope | `${Scope},${Scope}` | `${Scope},${Scope},${Scope}`;
                return_url?: string;
            }

            interface Client {
                authorize: (options: Options) => PromiseLike<string>;
            }
        }

        interface Client extends Authorize.Client {
            getToken: () => PromiseLike<string | null>;
            isAuthorized: () => PromiseLike<boolean>;
            clearToken: () => PromiseLike<void>;
        }

        interface Api {
            getRestApi: () => Client;
        }

        interface RestApiError {
            AuthDeniedError: Error;
        }
    }

    /**
     * docs: https://developer.atlassian.com/cloud/trello/power-ups/ui-functions/alert/
     */
    declare namespace Alert {
        interface Options {
            message: string;
            /**
             * {"min": 5, "max": 30, "default": 5}
             */
            duration?: number;
            display?: never;
        }

        interface Api {
            alert: (options: Options) => PromiseLike;
            hideAlert: () => void;
        }
    }

    /**
     * docs: https://developer.atlassian.com/cloud/trello/power-ups/ui-functions/board-bar/
     */
    declare namespace BoardBar {
        interface Action {
            icon: string;
            alt?: string;
            callback?: BaseCallback;
            position?: 'left' | 'right';
            url?: `https://${string}`;
        }
        interface Options {
            url: string;
            args?: Record<string, string>;
            height: number;
            accentColor: Color;
            callback?: BaseCallback;
            title?: string;
            actions?: Action[];
            resizable?: boolean;
        }

        interface Api {
            boardBar: (options: Options) => PromiseLike<void>;
            closeBoardBar: () => PromiseLike<void>;
        }
    }

    /**
     * docs: https://developer.atlassian.com/cloud/trello/power-ups/ui-functions/modal/
     */
    declare namespace Modal {
        interface Action {
            icon: string;
            alt?: string;
            callback?: BaseCallback;
            position?: 'left' | 'right';
            url?: `https://${string}`;
        }

        interface ModalOptions {
            url: string;
            accentColor: Color;
            height: number;
            fullscreen: boolean;
            callback?: BaseCallback;
            title?: string;
            actions?: Action[];
            args?: Record<string, string>;
        }

        type UpdateModalOptions = Pick<ModalOptions, 'accentColor' | 'actions' | 'fullscreen' | 'title'>

        interface Api {
            modal: (options: ModalOptions) => PromiseLike<void>;
            closeModal: () => PromiseLike<void>;
            updateModal: (options: UpdateModalOptions) => PromiseLike<void>;
        }
    }

    declare namespace Navigation {
        interface Api {
            navigate: (options: { url: string }) => PromiseLike<void>;
            showCard: (cardId: string) => PromiseLike<void>;
            hideCard: () => PromiseLike<void>;
        }
    }

    declare namespace Popup {
        declare namespace PopupList {
            // TODO check for "url" field
            interface Item {
                text: string;
                callback?: BaseCallback;
            }

            interface Options {
                title: string;
                items: Item[];
            }
        }

        declare namespace PopupSearch {
            interface Item {
                text: string;
                callback?: BaseCallback;
                url?: string;
                alwaysVisible?: boolean;
            }

            interface SearchOptions {
                count?: number;
                placeholder?: string;
                empty?: string;
                searching?: string;
                debounce?: number;
            }

            interface Options {
                title: string;
                items: Item[] | BaseCallback<PromiseLike<Item[]>>;
                search: SearchOptions;
            }
        }

        declare namespace PopupIframe {
            interface Options {
                title: string;
                url: string;
                args: Record<string, string>;
                height: number;
            }
        }

        declare namespace PopupDateTime {
            interface CallbackOptions extends BaseCallbackOptions {
                date: string;
            }

            interface Options {
                type: 'date' | 'datetime',
                title: string;
                callback: BaseCallback<void, CallbackOptions>;
                date?: Date;
                minDate?: Date;
                maxDate?: Date;
            }
        }

        declare namespace PopupConfirm {
            interface Options {
                type: 'confirm';
                title: string;
                message: string;
                confirmText: string;
                onConfirm: BaseCallback;
                confirmStyle?: 'primary' | 'danger';
                cancelText?: string;
                onCancel: BaseCallback;
            }
        }

        interface Api {
            popup: (
                options: PopupList.Options
                | PopupSearch.Options
                | PopupIframe.Options
                | PopupDateTime.Options
                | PopupConfirm.Options
            ) => PromiseLike<void>;
            closePopup: () => PromiseLike<void>;
        }
    }

    /**
     * docs: https://developer.atlassian.com/cloud/trello/power-ups/ui-functions/t-sizeto/
     */
    declare namespace SizeTo {
        interface Api {
            sizeTo: (arg: string | HTMLElement | number) => PromiseLike<void>;
        }
    }

    /**
     * docs: https://developer.atlassian.com/cloud/trello/power-ups/utils-and-helpers/
     */
    declare namespace Utils {
        // TODO list the available colors
        interface BrandColors {
            getHexString: (colorName: Color, weight?: number) => string;
            namedColorStringToHex: (color: Color | `${Color}#${string}`) => string;
        }

        interface Api {
            safe: (unsafeValue: string) => string;
        }

        interface Static {
            colors: BrandColors;
            relativeUrl: (url: string) => string;
        }
    }

    // TODO check in runtime
    declare namespace Confetti {
        interface Options {
            clientX: number;
            clientY: number;
            target: HTMLElement;
        }

        interface Api {
            confetti: (options: Options) => PromiseLike<void>;
        }
    }

    declare namespace Request {
        type Command = 'data'
            | 'set'
            | 'navigate'
            | 'showCard'
            | 'hideCard'
            | 'alert'
            | 'hideAlert'
            | 'popup'
            | 'overlay'
            | 'board-bar'
            | 'modal'
            | 'update-modal'
            | 'close-popup'
            | 'pop-popup'
            | 'close-overlay'
            | 'close-board-bar'
            | 'close-modal'
            | 'resize'
            | 'card'
            | 'cards'
            | 'list'
            | 'lists'
            | 'member'
            | 'board'
            | 'organization'
            | 'attach-to-card'
            | 'request-token'
            | 'confetti'
            | 'jwt';

        interface Api {
            request: <Result>(command: Command, result: Result) => PromiseLike<void>;
            requestToken: (options: BaseCallbackOptions) => PromiseLike<void>;
            requestWithContext: <Options, Result>(command: Command, options?: Options) => PromiseLike<Result>;
        }
    }

    declare namespace Deprecated {
        interface Api {
            /**
             * @deprecated
             */
            back: never;
            /**
             * @deprecated
             */
            closeOverlay: never;
            /**
             * @deprecated
             */
            hideBoardBar: never;
            /**
             * @deprecated
             */
            hideOverlay: never;
            /**
             * @deprecated
             */
            hide: never;
            /**
             * @deprecated
             */
            overlay: never;
        }
    }

    interface TrelloApi extends
        ErrorHandlers.Api,
        DataAccessor.Api,
        GetSet.Api,
        Secrets.Api,
        Localization.Api,
        Arg.Api,
        Attach.Api,
        Authorize.Api,
        Context.Api,
        Jwt.Api,
        NotifyParent.Api,
        SignUrl.Api,
        RestApiClient.Api,
        Alert.Api,
        BoardBar.Api,
        Modal.Api,
        Navigation.Api,
        Popup.Api,
        SizeTo.Api,
        Utils.Api,
        Confetti.Api,
        Request.Api,
        Deprecated.Api
    {
        command: string;
        secret: string;
        source: Window;
    }

    interface TrelloIframeApi extends TrelloApi, Render.Api {

    }

    interface BaseCallbackOptions {
        context: Context.Data;
        locale: string;
    }

    type BaseCallback<Result = void, Options extends BaseCallbackOptions = BaseCallbackOptions> = (t: TrelloApi, options: Options) => Result;
    type PromiseCallback<Result = void, Options extends BaseCallbackOptions = BaseCallbackOptions> = BaseCallback<Result | PromiseLike<Result>, Options>;
    type Conditions = 'admin' | 'edit' | 'readOnly' | 'signedIn' | 'signedOut' | 'always';

    interface Icon {
        dark: string;
        light: string;
    }

    type Color = 'blue' | 'green' | 'orange' | 'red' | 'yellow' | 'purple' | 'pink' | 'sky' | 'lime' | 'light-gray';

    type Capabilities = 'attachment-sections'
        | 'attachment-thumbnail'
        | 'authorization-status'
        | 'board-buttons'
        | 'card-back-section'
        | 'card-badges'
        | 'card-buttons'
        | 'card-detail-badges'
        | 'card-from-url'
        | 'format-url'
        | 'list-actions'
        | 'list-sorters'
        | 'on-enable'
        | 'on-disable'
        | 'remove-data'
        | 'save-attachment'
        | 'show-authorization'
        | 'show-settings';

    // TODO specify type
    type InitializeOptions = {
        appKey: string;
        appName: string;
    };

    declare namespace AttachmentSection {
        interface Attachment {
            url: string;
        }
        interface AttachmentSectionBase {
            claimed: Attachment[];
            icon: string;
            content: {
                // TODO other types?
                type: string | 'iframe';
                url: string;
                height: number;
            };
        }
        interface AttachmentSectionSync extends AttachmentSectionBase {
            id?: string;
            title: string;
        }
        interface AttachmentSectionAsync extends AttachmentSectionBase {
            id: string;
            title: () => PromiseLike<string>
        }
        type AttachmentSection = AttachmentSectionSync | AttachmentSectionAsync;

        interface Options extends BaseCallbackOptions {
            entries: Attachment[];
        }
        interface Api {
            'attachment-sections': PromiseCallback<AttachmentSection[], Options>;
        }
    }

    declare namespace AttachmentThumbnail {
        interface Result {
            title: string;
            image?: {
                url: string;
                logo: boolean;
            };
            modified?: Date;
            modifiedBy?: string;
            created?: Date;
            createdBy?: string;
            initialize?: {
                // TODO other types?
                type: string | 'iframe';
                url: string;
            }
        }

        interface Options extends BaseCallbackOptions {
            url: string;
        }

        interface Api {
            'attachment-thumbnail': PromiseCallback<Result, Options>;
        }
    }

    declare namespace AuthorizationStatus {
        interface Result {
            authorized: boolean;
        }

        interface Api {
            'authorization-status': PromiseCallback<Result>;
        }
    }

    declare namespace BoardButtons {
        interface BoardButton {
            icon: Icon,
            text: string;
            condition: Conditions;
            callback?: BaseCallback;
            url?: string;
            target?: string;
        }

        interface Api {
            'board-buttons': PromiseCallback<BoardButton[]>;
        }
    }

    declare namespace CardBackSection {
        interface Content {
            type: 'iframe';
            url: string;
            height: number;
        }

        interface Action {
            text: string;
            callback: BaseCallback;
        }

        interface Section {
            title: string;
            icon: string;
            content: Content;
            action: Action;
        }

        interface Api {
            'card-back-section': PromiseCallback<Section>;
        }
    }

    declare namespace CardBadges {
        interface CardBadge {
            text?: string;
            icon?: string | Icon;
            color?: Color;
        }

        interface DynamicCardBadgeResult extends CardBadge {
            refresh?: number;
        }

        interface DynamicCardBadge {
            dynamic: () => DynamicCardBadgeResult | PromiseLike<DynamicCardBadgeResult>;
        }

        interface Options extends BaseCallbackOptions {
            attachments: AttachmentSection.Attachment[];
        }

        interface Api {
            'card-badges': PromiseCallback<(DynamicCardBadge | CardBadge)[], Options>;
        }
    }

    declare namespace CardButtons {
        interface CardButton {
            icon?: string;
            text: string;
            condition?: Conditions;
            callback?: BaseCallback;
            url?: string;
            target?: string;
        }

        interface Api {
            'card-buttons': PromiseCallback<CardButton[]>;
        }
    }

    declare namespace CardDetailBadges {
        interface BaseCardBadge {
            text?: string;
            icon?: string | Icon;
            title?: string;
            color?: Color;
            url?: string;
            target?: string;
        }

        interface CallbackCardBadge extends BaseCardBadge {
            callback?: BaseCallback;
        }

        interface UrlCardBadge extends BaseCardBadge {
            url?: string;
            target?: string;
        }

        interface DynamicResult {
            refresh?: number;
        }

        type CardBadge = CallbackCardBadge | UrlCardBadge;
        type DynamicCardBadgeResult = CardBadge & DynamicResult;

        interface DynamicCardBadge {
            dynamic: () => DynamicCardBadgeResult | PromiseLike<DynamicCardBadgeResult>;
        }

        interface Api {
            'card-detail-badges': PromiseCallback<(DynamicCardBadge | CardBadge)[]>;
        }
    }

    declare namespace CardFromUrl {
        interface Options extends BaseCallbackOptions {
            url: string;
        }

        interface Api {
            'card-from-url': PromiseCallback<DataAccessor.Card, Options>;
        }
    }

    declare namespace FormatUrl {
        interface Options extends BaseCallbackOptions {
            url: string;
        }

        interface Action {
            text: string;
            callback: BaseCallback;
        }

        interface Image {
            url: string;
            size: 'contain' | 'original' | 'cover';
        }

        interface Format {
            icon: Icon;
            text: string;
            subtext: string;
            image: Image;
            actions: Action[];
            /**
             * @deprecated
             */
            thumbnail: never;
        }

        interface Api {
            'format-url': PromiseCallback<Format, Options>;
        }
    }

    declare namespace ListActions {
        interface Action {
            text: string;
            callback: PromiseCallback;
        }

        type AllowedActions = [Action] | [Action, Action] | [Action, Action, Action];

        interface Api {
            'list-actions': PromiseCallback<AllowedActions>;
        }
    }

    // TODO specify type
    interface CapabilityHandlers extends
        AttachmentSection.Api,
        AttachmentThumbnail.Api,
        AuthorizationStatus.Api,
        BoardButtons.Api,
        CardBackSection.Api,
        CardBadges.Api,
        CardButtons.Api,
        CardDetailBadges.Api,
        CardFromUrl.Api,
        FormatUrl.Api,
        ListActions.Api
    {
        'list-sorters': any;
        'on-enable': any;
        'on-disable': any;
        'remove-data': any;
        'save-attachment': any;
        'show-authorization': any;
        'show-settings': any;
    }
}
