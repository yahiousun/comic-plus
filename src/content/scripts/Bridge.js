import { PROTOCOL_CHROME_EXTENSION } from './constants';

class Bridge {
  get origin() {
    return `${PROTOCOL_CHROME_EXTENSION}://${this.id}`;
  }
  constructor() {
    this.id = chrome.runtime.id;
    this.ref = document.getElementById(this.id);
  }
  send(message) {
    if (this.ref && this.ref.contentWindow) {
      this.ref.contentWindow.postMessage({ ...message, id: this.id }, this.origin);
    }
  }
}

export default Bridge;
