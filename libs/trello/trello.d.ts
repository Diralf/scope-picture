declare global {
    interface Window {
        TrelloPowerUp: TrelloPowerUp;
    }
}

declare class TrelloPowerUp {
    static initialize(handlers: Trello.CapabilityHandlers, options?: Trello.InitializeOptions): void;
}

declare namespace Trello {
    interface TrelloApi {

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
