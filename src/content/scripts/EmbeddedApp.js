import Embedded from './Embedded';
import Injector from './Injector';
import Extractor from './Extractor';
import Downloader from './Downloader';
import { ACTIVE, INACTIVE, ACTIVATE, DEACTIVATE, TOGGLE, EXTRACT, DOWNLOAD, ERROR, PREPARE } from './constants';

class EmbeddedApp extends Embedded {
    constructor(url, props, styles) {
        super(url, props, styles, false);
        this.__onExtensionMessage__ = this.onExtensionMessage.bind(this);
        this.__onWindowMessage__ = this.onWindowMessage.bind(this);
        chrome.runtime.onMessage.addListener(this.__onExtensionMessage__);
    }
    onActivate() {
        window.addEventListener('message', this.__onWindowMessage__, true);
        document.body.style.overflow = 'hidden';
    }
    onDeactivate() {
        window.removeEventListener('message', this.__onWindowMessage__, true);
        document.body.style.overflow = null;
    }
    onExtensionMessage(request, sender, sendResponse) {
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
        }
    }
    onWindowMessage(e) {
        if (e.data && e.data.id && e.data.id === chrome.runtime.id) {
            switch(e.data.type) {
                case EXTRACT: {
                    return new Extractor();
                }
                case PREPARE: {
                    return new Downloader(e.data.payload);
                }
            }
        }
    }
}

export default EmbeddedApp;