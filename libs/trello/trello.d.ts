declare global {
    interface Window {
        TrelloPowerUp: TrelloPowerUp;
    }
}

declare class TrelloPowerUp {
    static initialize(handlers: Trello.CapabilityHandlers, options?: Trello.InitializeOptions): void;
}

declare namespace Trello {
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
        }
    }

    declare namespace Attach {
        interface Options {
            name?: string;
            url: string;
        }

        interface Api {
            attach: (options: Options) => PromiseLike;
        }
    }

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
     * docs: https://developer.atlassian.com/cloud/trello/power-ups/client-library/accessing-trello-data/
     */
    declare namespace DataAccessor {
        type TrelloDataAccessor<Options, Result = Options> = (
            ...requestedFields: Array<keyof Options> | ['all']
        ) => PromiseLike<Result>;

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
        type Id = string;
        type Scope = Id | 'board' | 'card' | 'member' | 'organization';
        type Visibility = 'shared' | 'private';

        interface Api {
            // TODO narrowing types
            get: <Value>(scope: Scope, visibility: Visibility, key: string, defaultValue: Value) => PromiseLike<Value>
                | (<Data>(scope: Scope, visibility: Visibility) => PromiseLike<Data>);
            getAll: <AllData>() => AllData;
            set: <Value>(scope: Scope, visibility: Visibility, key: string, value: Value) => PromiseLike<void>
                | (<Data>(scope: Scope, visibility: Visibility, data: Data) => PromiseLike<void>);
            remove: (scope: Scope, visibility: Visibility, key: string | string[]) => PromiseLike<void>;
        }
    }

    interface TrelloApi extends Alert.Api, Attach.Api, Authorize.Api, DataAccessor.Api, GetSet.Api {
        InvalidContext: (message: string) => void;
        NotHandled: (message: string) => void;
        PluginDisabled: (message: string) => void;
        arg: never;
        args: never;
        /**
         * @deprecated
         */
        back: never;
        boardBar: any;
        clearSecret: any;
        closeBoardBar: any;
        closeModal: any;
        closeOverlay: any;
        closePopup: any;
        command: any;
        confetti: any;
        getContext: any;
        getRestApi: any;
        hide: any;
        hideAlert: () => void;
        hideBoardBar: any;
        hideCard: any;
        hideOverlay: any;
        jwt: any;
        loadSecret: any;
        localizeKey: any;
        localizeKeys: any;
        localizeNode: any;
        modal: any;
        navigate: any;
        notifyParent: any;
        overlay: any;
        popup: any;
        request: any;
        requestToken: any;
        requestWithContext: any;
        safe: any;
        secret: any;
        showCard: any;
        signUrl: any;
        sizeTo: any;
        source: any;
        storeSecret: any;
        updateModal: any;
    }
    interface Context {

    }

    interface BaseCallbackOptions {
        context: Context;
        locale: string;
    }

    type BaseCallback = <Result = void>(t: TrelloApi, options: BaseCallbackOptions) => Result;
    type Conditions = 'admin' | 'edit' | 'readOnly' | 'signedIn' | 'signedOut' | 'always';

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

    type InitializeOptions = any;

    interface CardButton {
        icon: string;
        text: string;
        condition?: Conditions;
        callback?: BaseCallback;
        url?: string;
        target?: string;
    }

    interface CapabilityHandlers {
        'attachment-sections': any;
        'attachment-thumbnail': any;
        'authorization-status': any;
        'board-buttons': any;
        'card-back-section': any;
        'card-badges': any;
        'card-buttons': BaseCallback<CardButton[]>;
        'card-detail-badges': any;
        'card-from-url': any;
        'format-url': any;
        'list-actions': any;
        'list-sorters': any;
        'on-enable': any;
        'on-disable': any;
        'remove-data': any;
        'save-attachment': any;
        'show-authorization': any;
        'show-settings': any;
    }
}
