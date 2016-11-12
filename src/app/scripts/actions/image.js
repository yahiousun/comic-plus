import { DOWNLOAD_STATE_CHANGE, PREPARE } from '../constants/actionTypes'
import { LOADING } from '../constants/status'

export function downloadImage(url) {
    return (dispatch, getState) => {
        dispatch({
            type: DOWNLOAD_STATE_CHANGE,
            payload: url,
            status: LOADING
        });
        window.parent.postMessage({
            id: chrome.runtime.id,
            type: PREPARE,
            payload: url
        }, '*');
    }
}

export function downloadImageStateChange(url, status) {
    return {
        type: DOWNLOAD_STATE_CHANGE,
        payload: url,
        status: status
    };
}