import {EXTRACTSUCCESS, EXTRACTERROR} from './constants'; 

export const handleExtract = (e) => {
    switch (e.type) {
        case EXTRACTSUCCESS: {
            chrome.runtime.sendMessage(
                {
                    type: EXTRACTSUCCESS,
                    payload: e.detail.payload
                },
                (response) => {
                    console.log(response);
                }
            );
            break;
        }
        case EXTRACTERROR: {
            chrome.runtime.sendMessage(
                {
                    type: EXTRACTERROR,
                    payload: e.detail.payload || 'An unknown error occurred.'
                },(response) => {
                    console.log(response);
                }
            );
            break;
        }
        default: {
            chrome.runtime.sendMessage(
                {
                    type: EXTRACTERROR,
                    payload: e.detail.payload || 'An unknown error occurred.'
                },(response) => {
                    console.log(response);
                }
            );
        }
    }
}