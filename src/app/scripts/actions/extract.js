import { PENDING, EXTRACT } from '../constants';

export function extract() {
    return (dispatch, getState) => {
        dispatch({
            type: PENDING
        })
        window.parent.postMessage({
            type: EXTRACT
        }, '*');
    }
}