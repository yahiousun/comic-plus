import { EXTRACTSUCCESS, EXTRACTERROR, EXTRACTION_SUCCESS, EXTRACTION_FAILED } from './constants';

export const bindMessageToStore = (store) => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        switch (request.type) {
            case EXTRACTSUCCESS: {
                store.dispatch({
                    type: EXTRACTION_SUCCESS,
                    payload: request.payload
                })
                break;
            }
            case EXTRACTERROR: {
                store.dispatch({
                    type: EXTRACTION_FAILED,
                    payload: request.payload
                })
                break;
            }
        }
    })
}
