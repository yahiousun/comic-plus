import { EXTRACTOR_STATE_CHANGE, DOWNLOAD_STATE_CHANGE } from './constants/actionTypes';
import { extractorStateChange } from './actions/resource';
import { downloadImageStateChange } from './actions/image';

function onWindowMessageHandler(store, e) {
  if (e.data && e.data.id === chrome.runtime.id) {
    switch(e.data.type) {
      case EXTRACTOR_STATE_CHANGE: {
        return store.dispatch(extractorStateChange(e.data.payload, e.data.state, e.data.error));
      }
      case DOWNLOAD_STATE_CHANGE: {
        return store.dispatch(downloadImageStateChange(e.data.payload, e.data.state));
      }
    }
  }
}

export function bindWindowMessageToStore(store) {
  window.addEventListener('message', onWindowMessageHandler.bind(this, store));
}
