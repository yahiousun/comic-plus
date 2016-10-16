import Embedded from './Embedded';
import Injector from './Injector';

import * as extractors from './extractors';
import { ACTIVE, INACTIVE, ACTIVATE, DEACTIVATE, TOGGLE, EXTRACT, DOWNLOAD } from './constants';

class EmbeddedApp extends Embedded {
    constructor(url, props, styles) {
        super(url, props, styles, false);
        this.onExtensionMessage = this.__onExtensionMessage__.bind(this);
        this.onWindowMessage = this.__onWindowMessage__.bind(this);
        chrome.runtime.onMessage.addListener(this.onExtensionMessage);
    }
    onActivate() {
        window.addEventListener('message', this.onWindowMessage, true);
        document.body.style.overflow = 'hidden';
    }
    onDeactivate() {
        window.removeEventListener('message', this.onWindowMessage, true);
        document.body.style.overflow = null;
    }
    __onExtensionMessage__(request, sender, sendResponse) {
        switch (request.type) {
            case ACTIVATE: {
                if (this.state !== ACTIVE && this.state !== PENDING) {
                    this.url = chrome.extension.getURL('app.html') + '#reader/' + request.payload;
                    this.activate();
                }
                break;
            }
            case DEACTIVATE: {
                if (this.state !== INACTIVE && this.state !== PENDING) {
                    this.deactivate();
                }
                break;
            }
            case TOGGLE: {
                this.url = chrome.extension.getURL('app.html') + '#reader/' + request.payload;
                this.toggle();
                break;
            }
            case DOWNLOAD: {
                break;
            }
        }
    }
    __onWindowMessage__(e) {
        if (e.data && e.data.type) {
            switch(e.data.type) {
                case EXTRACT: {
                    break;
                }
                case DOWNLOAD: {
                    break;
                }
            }
        }
    }
}

export default EmbeddedApp;