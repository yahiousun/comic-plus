import { IMAGE_LOADSTART, IMAGE_PROGRESS, IMAGE_LOAD, IMAGE_ERROR, IMAGE_TIMEOUT, PREPARE } from '../constants/actionTypes';

export function loadImage(url) {
    return (dispatch, getState) => {
        dispatch({
            type: IMAGE_LOADSTART
        });
        window.parent.postMessage({
            id: chrome.runtime.id,
            type: PREPARE,
            payload: url
        }, '*');
    }
}

export function loadImageProgress(url) {
    return {
        type: IMAGE_PROGRESS,
        payload: url
    };
}

export function loadImageComplete(url) {
    return {
        type: IMAGE_LOAD,
        payload: url
    };
}

export function loadImageError(url) {
    return {
        type: IMAGE_ERROR,
        payload: url
    };
}

export function loadImageTimeout(url) {
    return {
        type: IMAGE_TIMEOUT,
        payload: url
    };
}