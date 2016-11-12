import { EXTRACT_STATE_CHANGE, DOWNLOAD_STATE_CHANGE } from './constants/actionTypes';
import { extractStateChange } from './actions/resource';
import { downloadImageStateChange } from './actions/image';

function onWindowMessageHandler (store, e) {
    if (e.data && e.data.id === chrome.runtime.id) {
        switch(e.data.type) {
            case EXTRACT_STATE_CHANGE: {
                return store.dispatch(extractStateChange(e.data.payload, e.data.status, e.data.error));
            }
            case DOWNLOAD_STATE_CHANGE: {
                return store.dispatch(downloadImageStateChange(e.data.payload, e.data.status));
            }
        }
    }
}

export function bindWindowMessageToStore(store) {
    window.addEventListener('message', onWindowMessageHandler.bind(this, store));
}