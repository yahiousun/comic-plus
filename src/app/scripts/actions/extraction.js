import { EXTRACTION_START, EXTRACTION_PENDING, SELECT_CHAPTER, ADD_QUERY, REMOVE_QUERY, EXTRACT, LOADING, LOADED, FAILED, REQUEST_IMAGE } from '../constants'

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

export function selectChapter(tabId, chapterUrl) {
    return (dispatch, getState) => {
        dispatch({
            type: EXTRACTION_START
        })
        chrome.tabs.sendMessage(Number(tabId), {type: SELECT_CHAPTER, payload: chapterUrl}, (response) => {
            if (getState().extraction.status === LOADING) {
                dispatch({
                    type: EXTRACTION_PENDING
                })
            }
        });
    }
}

export function requestImage(tabId, imgSrc) {
    return (dispatch, getState) => {
        dispatch({
            type: ADD_QUERY,
            payload: imgSrc
        })
        return new Promise((resolve, reject) => {
            chrome.tabs.sendMessage(Number(tabId), {type: REQUEST_IMAGE, payload: imgSrc}, (response) => {
                dispatch({
                    type: REMOVE_QUERY,
                    payload: imgSrc
                })
                if (response.type === LOADED) {
                    resolve(response)
                }
                else {
                    reject(response)
                }
            });
        })
        
    }
}