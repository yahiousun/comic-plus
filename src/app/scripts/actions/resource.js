import { EXTRACT_STATE_CHANGE, EXTRACT } from '../constants/actionTypes'
import { LOADING } from '../constants/status'

export function loadResource() {
    return (dispatch, getState) => {
        dispatch({
            type: EXTRACT_STATE_CHANGE,
            status: LOADING
        });
        window.parent.postMessage({
            id: chrome.runtime.id,
            type: EXTRACT
        }, '*');
    };
}

export function extractStateChange(payload, status, error) {
    return {
        type: EXTRACT_STATE_CHANGE,
        payload: payload,
        status: status,
        error: error
    };
}