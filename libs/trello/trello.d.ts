declare global {
    interface Window {
        TrelloPowerUp: TrelloPowerUp;
    }
}

declare class TrelloPowerUp {
    static initialize(handlers: Trello.CapabilityHandlers, options?: Trello.InitializeOptions): void;
}

declare namespace Trello {
    interface Alert {
        message: string;
        /**
         * {"min": 5, "max": 30, "default": 5}
         */
        duration?: number;
        display?: never;
    }

    interface Attachment {
        name?: string;
        url: string;
    }

    interface AuthorizeOptions {
        height: number;
        width: number;
        validToken: (token: string) => boolean;
        windowCallback: (authorizeWindow: Window) => void;
    }

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

    interface TrelloApi {
        InvalidContext: (message: string) => void;
        NotHandled: (message: string) => void;
        PluginDisabled: (message: string) => void;
        alert: (alert: Alert) => PromiseLike;
        arg: never;
        args: never;
        attach: (attachment: Attachment) => PromiseLike;
        authorize: (url: string, options: AuthorizeOptions) => PromiseLike<string>;
        /**
         * @deprecated
         */
        back: never;
        board: TrelloDataAccessor<Board>;
        boardBar: any;
        card: TrelloDataAccessor<Card>;
        cards: TrelloDataAccessor<Card, Card[]>;
        clearSecret: any;
        closeBoardBar: any;
        closeModal: any;
        closeOverlay: any;
        closePopup: any;
        command: any;
        confetti: any;
        get: any;
        getAll: any;
        getContext: any;
        getRestApi: any;
        hide: any;
        hideAlert: () => void;
        hideBoardBar: any;
        hideCard: any;
        hideOverlay: any;
        isMemberSignedIn: () => boolean;
        jwt: any;
        list: TrelloDataAccessor<List>;
        lists: TrelloDataAccessor<List, List[]>;
        loadSecret: any;
        localizeKey: any;
        localizeKeys: any;
        localizeNode: any;
        member: TrelloDataAccessor<Member>;
        memberCanWriteToModel: (model: 'board' | 'card' | 'organization') => boolean;
        modal: any;
        navigate: any;
        notifyParent: any;
        organization: TrelloDataAccessor<Organization>;
        overlay: any;
        popup: any;
        remove: any;
        request: any;
        requestToken: any;
        requestWithContext: any;
        safe: any;
        secret: any;
        set: any;
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
