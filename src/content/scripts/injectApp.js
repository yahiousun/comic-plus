import { PENDING, STOPPED, RUNNING } from './constants';

class InjectApp {
    constructor(url) {
        this._url = url;
        this._injectApp = null;
        this._status = PENDING;
        this._injectApp = document.createElement('iframe');
        this._injectApp.style.width = '100%';
        this._injectApp.style.height = '100%';
        this._injectApp.style.position = 'fixed';
        this._injectApp.style.top = 0;
        this._injectApp.style.right = 0;
        this._injectApp.style.bottom = 0;
        this._injectApp.style.left = 0;
        this._injectApp.style.zIndex = 2147483647;
        this._injectApp.frameBorder = 0;
        this._injectApp.allowTransparency = true;
        this._injectApp.id = chrome.runtime.id;
        this._injectApp.addEventListener('load', this._onload.bind(this), false);
        this._injectApp.src = this._url;
        document.body.appendChild(this._injectApp);
        document.body.style.overflow = 'hidden';
    }
    _onload() {
        if (this._status === PENDING) {
            this._status = RUNNING;
        }
    }
    terminate() {
        if (this._status === STOPPED) {
            return;
        }
        this._injectApp.parent.removeChild(this._injectApp);
        this._injectApp = null;
        document.body.style.overflow = null;
        this._status = STOPPED;
    }
}

export default InjectApp;