import { DOWNLOADING, PREPARE, CACHED } from '../constants';

export function prepare(url) {
    return (dispatch, getState) => {
        dispatch({
            type: DOWNLOADING
        });
        window.parent.postMessage({
            id: chrome.runtime.id,
            type: PREPARE,
            payload: url
        }, '*');
    }
}

export function cached(url) {
    return {
        type: CACHED,
        payload: url
    };
}