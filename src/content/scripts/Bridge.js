import { PROTOCOL_CHROME_EXTENSION } from './constants';

class Bridge {
    get origin() {
        return PROTOCOL_CHROME_EXTENSION + '//' + this.id;
    }
    constructor(id) {
        this.id = id || chrome.runtime.id;
        this.ref = document.getElementById(this.id);
    }
    send(msg) {
        if (this.ref && this.ref.contentWindow) {
            this.ref.contentWindow.postMessage({ ...msg, id: this.id }, this.origin);
        }
    }
}

export default Bridge;