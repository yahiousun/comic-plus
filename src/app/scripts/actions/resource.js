import { RESOURCE_LOADSTART, RESOURCE_PROGRESS, RESOURCE_LOAD, RESOURCE_ERROR, RESOURCE_TIMEOUT, EXTRACT } from '../constants/actionTypes';

export function loadResource() {
    return (dispatch, getState) => {
        dispatch({
            type: RESOURCE_LOADSTART
        });
        window.parent.postMessage({
            id: chrome.runtime.id,
            type: EXTRACT
        }, '*');
    };
}

export function loadResourceProgress() {
    return {
        type: RESOURCE_PROGRESS
    };
}

export function loadResourceComplete(data) {
    return {
        type: RESOURCE_LOAD,
        payload: data
    };
}

export function loadResourceError() {
    return {
        type: RESOURCE_ERROR
    };
}

export function loadResourceTimeout() {
    return {
        type: RESOURCE_TIMEOUT
    };
}