import { EXTRACTIONSTART, EXTRACT } from '../constants';

export function extract(tabId) {
    return (dispatch, getState) => {
        dispatch({
            type: EXTRACTIONSTART
        })
        window.parent.postMessage({
            type: EXTRACT
        }, '*');
    }
}