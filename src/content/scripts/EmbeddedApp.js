import Embedded from './Embedded';

import { ACTIVE, INACTIVE, ACTIVATE, DEACTIVATE, TOGGLE, DOWNLOAD } from './constants';

class EmbeddedApp extends Embedded {
    constructor(url, props, styles) {
        super(url, props, styles, false);
        chrome.runtime.onMessage.addListener(this.onMessage.bind(this));
    }
    onActivate() {
        document.body.style.overflow = 'hidden';
    }
    onDeactivate() {
        document.body.style.overflow = null;
    }
    onMessage(request, sender, sendResponse) {
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
}

export default EmbeddedApp;