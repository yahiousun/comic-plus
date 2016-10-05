import { EXTRACTION_START, EXTRACTION_PENDING, EXTRACT, LOADING, LOADED, FAILED, REQUEST_IMAGE } from '../constants'

export function extract(tabId) {
    return (dispatch, getState) => {
        dispatch({
            type: EXTRACTION_START
        })
        chrome.tabs.sendMessage(Number(tabId), {type: EXTRACT}, (response) => {
            if (getState().extraction.status === LOADING) {
                dispatch({
                    type: EXTRACTION_PENDING
                })
            }
        });
    }
}