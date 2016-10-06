import {EXTRACT_CHAPTER, STORAGEPREFIX, SELECT_CHAPTER, REQUEST_IMAGE, LOADED, FAILED, EXTRACTSUCCESS, EXTRACTERROR} from './constants';
import {handleExtract} from './bridge';
import {extractor} from './extractor';
import {requestImage} from './requestImage';

window.addEventListener(EXTRACTSUCCESS, handleExtract, false);
window.addEventListener(EXTRACTERROR, handleExtract, false);

// bind request linstener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    switch(request.type) {
        case SELECT_CHAPTER: {
            window.sessionStorage.setItem(STORAGEPREFIX + 'isWaitingForExtractor', Date.now());
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
        }
        default: {
            extractor();
        }
    }
});

let isWaitingForExtractor = window.sessionStorage.getItem(STORAGEPREFIX + 'isWaitingForExtractor');

if (isWaitingForExtractor) {
    window.sessionStorage.removeItem(STORAGEPREFIX + 'isWaitingForExtractor');
    extractor();
}