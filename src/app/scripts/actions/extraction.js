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
        console.log(getState());
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

// export function requestImage(tabId, imgSrc) {
//     return (dispatch, getState) => {
//         console.log(getState());
//         dispatch({
//             type: ADD_QUERY,
//             payload: imgSrc
//         })
//         chrome.tabs.sendMessage(Number(tabId), {type: REQUEST_IMAGE}, (response) => {
//             //
//         });
//     }
// }