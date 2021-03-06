import Embedded from './Embedded';
import Injector from './Injector';
import Extractor from './Extractor';
import Downloader from './Downloader';
import { ACTIVE, INACTIVE, ACTIVATE, DEACTIVATE, TOGGLE, EXTRACT, DOWNLOAD, INITIALIZE, PREPARE, CHAPTER_SELECT, SESSION_REQUEST } from './constants';

class EmbeddedApp extends Embedded {
  constructor(url, props, styles, active) {
    super(url, props, styles, active);
    this.onExtensionMessage = this.onExtensionMessage.bind(this);
    this.onWindowMessage = this.onWindowMessage.bind(this);
    chrome.runtime.onMessage.addListener(this.onExtensionMessage);

    // get global options
    chrome.storage.local.get('options', options => {
      this.options = { ...options };
    });
    if (window.sessionStorage.getItem('comicplus')) {
      window.sessionStorage.removeItem('comicplus');
      chrome.runtime.sendMessage({ type: SESSION_REQUEST }, () => {});
    }
  }
  onActivate() {
    window.addEventListener('message', this.onWindowMessage, true);
    document.body.style.overflow = 'hidden';
  }
  onDeactivate() {
    window.removeEventListener('message', this.onWindowMessage, true);
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
          return new Extractor(this.props.id, this.options.extractor);
        }
        case PREPARE: {
          return new Downloader(e.data.payload);
        }
        case CHAPTER_SELECT: {
          window.sessionStorage.setItem('comicplus', Date.now());
          setTimeout(function() {
            window.location.href = e.data.payload;
          });
        }
      }
    }
  }
}

export default EmbeddedApp;
