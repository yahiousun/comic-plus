import {EXTRACT_CHAPTER, EXTRACT_CONTENTS, SELECT_CHAPTER, REQUEST_IMAGE, LOADED, FAILED, EXTRACTSUCCESS, EXTRACTERROR} from './constants';
import {handleExtract} from './bridge';
import {extractor} from './extractor';
import {requestImage} from './requestImage';

// bind extract listener
window.addEventListener(EXTRACTSUCCESS, handleExtract, false);
window.addEventListener(EXTRACTERROR, handleExtract, false);

// bind request linstener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    switch(request.type) {
        case SELECT_CHAPTER: {
            window.location.href = request.payload;
            break;
        }
        case REQUEST_IMAGE: {
            requestImage(request.payload).then((res) => {
                sendResponse({
                    type: LOADED,
                    payload: res
                })
            },
            (err) => {
                sendResponse({
                    type: FAILED,
                    payload: err
                })
            })
            return true;
            break;
        }
        default: {
            extractor();
        }
    }
});