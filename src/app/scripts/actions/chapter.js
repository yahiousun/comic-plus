import { CHAPTER_SELECT } from '../constants/actionTypes';

export function chapterSelect(url) {
    return (dispatch, getState) => {
        dispatch({
            type: CHAPTER_SELECT
        });
        window.parent.postMessage({
            id: chrome.runtime.id,
            type: CHAPTER_SELECT,
            payload: url
        }, '*');
    }
}