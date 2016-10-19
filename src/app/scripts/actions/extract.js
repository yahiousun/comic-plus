import { PENDING, EXTRACT, INITIALIZE } from '../constants';

export function extract() {
    return (dispatch, getState) => {
        dispatch({
            type: PENDING
        });
        window.parent.postMessage({
            id: chrome.runtime.id,
            type: EXTRACT
        }, '*');
    };
}

export function initialize(data) {
    return {
        type: INITIALIZE,
        payload: data
    };
}