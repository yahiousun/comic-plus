import { RESOURCE_PROGRESS, RESOURCE_LOAD, RESOURCE_ERROR, RESOURCE_TIMEOUT, IMAGE_PROGRESS, IMAGE_LOAD, IMAGE_ERROR, IMAGE_TIMEOUT } from './constants/actionTypes';
import { loadResourceProgress, loadResourceComplete, loadResourceError, loadResourceTimeout } from './actions/resource';
import { loadImageProgress, loadImageComplete, loadImageError, loadImageTimeout } from './actions/image';

function onWindowMessageHandler (store, e) {
    if (e.data && e.data.id === chrome.runtime.id) {
        switch(e.data.type) {
            case RESOURCE_PROGRESS: {
                return store.dispatch(loadResourceProgress());
            }
            case RESOURCE_LOAD: {
                return store.dispatch(loadResourceComplete(e.data.payload));
            }
            case RESOURCE_ERROR: {
                return store.dispatch(loadResourceError());
            }
            case RESOURCE_TIMEOUT: {
                return store.dispatch(loadResourceTimeout());
            }
            case IMAGE_PROGRESS: {
                return store.dispatch(loadImageProgress(e.data.payload));
            }
            case IMAGE_LOAD: {
                return store.dispatch(loadImageComplete(e.data.payload));
            }
            case IMAGE_ERROR: {
                return store.dispatch(loadImageError(e.data.payload));
            }
            case IMAGE_TIMEOUT: {
                return store.dispatch(loadImageTimeout(e.data.payload));
            }
        }
    }
}

export function bindWindowMessageToStore(store) {
    window.addEventListener('message', onWindowMessageHandler.bind(this, store));
}